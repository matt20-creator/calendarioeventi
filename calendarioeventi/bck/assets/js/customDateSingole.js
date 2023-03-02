fetch("/assets/json/eventi.json")
    .then(response => response.json())
    .then(data => {



        let arrayNuovo = [];
        for( const property in data ){

            const { title } = data[property];
            const { date } = data[property];
            const { siena_comunica_link } = data[property];
            const { mostra_in_calendario } = data[property];
            const { evento_siena_comunica } = data[property];
            const { testo_link } = data[property];

            date.forEach(dateEventi => {

                arrayNuovo.push(dateEventi);
   //             const calendarioDivDate = document.createElement('div');
//
//                calendarioDivDate.classList.add("date", `date-${dateEventi}`);
//                calendarioDivDate.innerHTML = dateEventi;
//                const calendarioContainer = document.querySelector( '#calendario-siena' );

//                calendarioContainer.appendChild( calendarioDivDate );


//                const calendarioDiv = document.createElement('div');
//                const calendarioDivTitle = document.createElement('div');
//                const calendarioDivLink = document.createElement('div');
//                const calendarioDivTextLink = document.createElement('div');

//                calendarioDiv.classList.add("eventi-item");
//
//                calendarioDivTitle.classList.add("title");
//                calendarioDivTitle.innerHTML = title;




//                calendarioDivLink.classList.add("link");
//                calendarioDivLink.innerHTML = siena_comunica_link;
//
//                calendarioDivTextLink.classList.add("text_link");
//                calendarioDivTextLink.innerHTML = testo_link;

//                calendarioDivDate.appendChild( calendarioDiv );
//                calendarioDiv.appendChild( calendarioDivTitle );
//                calendarioDiv.appendChild( calendarioDivLink );
//                calendarioDiv.appendChild( calendarioDivTextLink );
            });



        }

        let arraySingolo = [...new Set (arrayNuovo)];
        console.log(arraySingolo);



            arraySingolo.forEach(dateEventi => {
                const calendarioDivDate = document.createElement('div');
                calendarioDivDate.classList.add("date", `date-${dateEventi}`);
                calendarioDivDate.innerHTML = dateEventi;
                const calendarioContainer = document.querySelector( '#calendario-siena' );

                calendarioContainer.appendChild( calendarioDivDate );

                const calendarioDiv = document.createElement('div');
                const calendarioDivTitle = document.createElement('div');
                const calendarioDivLink = document.createElement('div');
                const calendarioDivTextLink = document.createElement('div');

                calendarioDiv.classList.add("eventi-item");

                calendarioDivDate.appendChild( calendarioDiv );
            });



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

        // const owlItem = document.querySelectorAll(".owl-item");
        //
        // owlItem.forEach(owlDate => {
        //     date.forEach(dateEventi => {
        //         // console.log(dateEventi);
        //
        //         owlDate.classList.add("date", `date-${dateEventi}`);
        //
        //     });
        // });
    });

