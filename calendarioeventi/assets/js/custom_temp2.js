fetch("/assets/json/eventi.json")
    .then(response => response.json())
    .then(data => {



        let newArrayDate = [];
        for( const property in data ){

            const { title } = data[property];
            const { date } = data[property];
            const { siena_comunica_link } = data[property];
            const { mostra_in_calendario } = data[property];
            const { evento_siena_comunica } = data[property];
            const { testo_link } = data[property];

            date.forEach(dateEventi => {
                newArrayDate.push(dateEventi);
            });
        }


        console.log(newArrayDate)

        let arrayDate = [...new Set (newArrayDate)];
        console.log(arrayDate);



        let fromInput = document.querySelector("#min-date");
        let toInput = document.querySelector("#min-date");

        // fromInput.addEventListener('change', updateDate);
        // toInput.addEventListener('change', updateDate);

        // function updateDate(e){

        const from = document.querySelector("#min-date").value;
        const to = document.querySelector("#max-date").value;
        filteredDate = arrayDate.filter(dateFilter);

        function dateFilter(datee){
            return datee >= `${from}` && datee <= `${to}`;
        }

        console.log(arrayDate);
        console.log(filteredDate);


        filteredDate.forEach(dateEventi => {
            const calendarioDivDate = document.createElement('div');
            calendarioDivDate.classList.add(`date`, `date-${dateEventi}`);
            calendarioDivDate.innerHTML = dateEventi;
            const calendarioContainer = document.querySelector( '#calendario-siena' );

            calendarioContainer.appendChild( calendarioDivDate );

        });
        let i = 0;

        for (const property in data) {

            const {title} = data[property];
            const {date} = data[property];
            const {siena_comunica_link} = data[property];
            const {testo_link} = data[property];

            filteredDate.forEach(dateEventi => {


                const calendarioDiv = document.querySelector(`.date-${dateEventi}`);
                const calendarioDivTitle = document.createElement('div');
                const calendarioDivLink = document.createElement('div');
                const calendarioDivTextLink = document.createElement('div');



                calendarioDiv.append(calendarioDivTitle)
                calendarioDivTitle.innerHTML = (title === null) ? '' : title;
                //
                // calendarioDiv.append(calendarioDivLink)
                // calendarioDivLink.innerHTML = siena_comunica_link;
                //
                // calendarioDiv.append(calendarioDivTextLink)
                // calendarioDivTextLink.innerHTML = testo_link;

            });

        }


        const calendarioDiv = document.querySelectorAll(`.owl-item.date`);

        if(calendarioDiv.className !== filteredDate) {
            calendarioDiv.remove();
        }

        $('.owl-carousel').owlCarousel({
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }
        });

        jQuery(".owl-item").each(function(){
            let classDate = jQuery("> div", $(this)).attr("class");
            jQuery(this).addClass(classDate);
        });


        // }


    });

