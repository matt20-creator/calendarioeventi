function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

fetch("https://test.comunebrescia.bbsitalia.com/rest/eventi-calendario")
    .then(response => response.json())
    .then(data => {


        $('#calendario-brescia').owlCarousel({
            dots: true,
            nav: true,
            navText:['<div class="owl-prev">❰</div>','<div class="owl-next">❱</div>'],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        });

        const newData = data.data.map(event => {
            const { data_inizio, data_fine } = event;

            if (!data_inizio) {
                return { ...event, date: [] }; // se data_inizio non è presente, aggiungi un array vuoto di date
            }

            const startDate = new Date(data_inizio);
            const endDate = new Date(data_fine);
            const dates = [];

            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                const isoDate = date.toISOString().substring(0, 10);
                dates.push(isoDate);
            }

            if (!data_fine) {
                dates.push(startDate.toISOString().substring(0, 10)); // se data_fine non è presente, aggiungi comunque la data di inizio all'array delle date
            }

            return { ...event, date: dates };
        });

        console.log(newData);


        // let eventi = [data;


        // const eventiConDate = eventi.map(function(evento) {
        //     const dateArray = [];
        //     const startDate = new Date(evento.data_inizio);
        //     const endDate = evento.data_fine ? new Date(evento.data_fine) : startDate;
        //
        //     for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        //         const dateString = date.toISOString().substring(0, 10);
        //         dateArray.push(dateString);
        //     }
        //
        //     evento.date = dateArray;
        //     return evento;
        // });

        // console.log(eventiConDate);

        let newArrayDate = [];
        for( const property in newData ){

            const { date } = newData[property];
            date.forEach(dateEventi => {
                newArrayDate.push(dateEventi);
            });
        }
        console.log(newArrayDate)

        let arrayDate = [...new Set (newArrayDate)];
        console.log(arrayDate);
        arrayDate.sort();

        arrayDate.forEach(dateEventi => {
            const calendarioDivDate = document.createElement('div');
            const calendarioSpanDate = document.createElement('span');
            const calendarioitSingleSlide = document.createElement('div')
            calendarioitSingleSlide.classList.add('it-single-slide-wrapper', 'h-100')
            const calendarioCardWrapperWrapper = document.createElement('div')
            calendarioCardWrapperWrapper.classList.add('card-wrapper', 'h-100')
            const calendarioCardWrapper = document.createElement('div')
            calendarioCardWrapper.classList.add('card', 'card-bg')
            const calendarioCardoBodyWrapper = document.createElement('div')
            calendarioCardoBodyWrapper.classList.add('card-body')
            calendarioDivDate.classList.add(`date`, `date-${dateEventi}`);
            calendarioSpanDate.classList.add('data');
            calendarioSpanDate.innerHTML = dateEventi;
            const calendarioContainer = document.querySelector( '#calendario-brescia' );

            calendarioContainer.appendChild( calendarioitSingleSlide );
            calendarioitSingleSlide.appendChild( calendarioCardWrapperWrapper );
            calendarioCardWrapperWrapper.appendChild( calendarioCardWrapper );
            calendarioCardWrapper.appendChild( calendarioCardoBodyWrapper );

            calendarioCardoBodyWrapper.appendChild( calendarioDivDate );
            calendarioDivDate.appendChild( calendarioSpanDate );
        });
        let i = 0;

        for (const property in newData) {

            const {title} = newData[property];
            const {date} = newData[property];
            const {field_link_siena_comunica_export} = newData[property];
            // const {testo_link} = data[property];

            date.forEach(dateEventi => {


                const calendarioDiv = document.querySelector(`.date-${dateEventi}`);
                const calendarioDivTitle = document.createElement('div');
                calendarioDivTitle.classList.add('views-field', 'views-field-title')
                // console.§
                // const calendarioDivLink = createElementFromHTML((field_link_siena_comunica_export === null) ? '' : field_link_siena_comunica_export);
                // const calendarioDivTextLink = document.createElement('div');


                calendarioDiv.append(calendarioDivTitle)
                calendarioDivTitle.innerHTML = title;
                // calendarioDivTitle.append((calendarioDivLink === null) ? '' : calendarioDivLink)

                // calendarioDivLinkDiv.append()
                // calendarioDiv.append(calendarioDivTextLink)
                // calendarioDivTextLink.innerHTML = testo_link;

            });

        }
        let fromInput = document.querySelector("#min-date");
        let toInput = document.querySelector("#max-date");

        // fromInput.addEventListener('change', updateDate);
        // toInput.addEventListener('change', updateDate);

        // function updateDate(e){

        const from = document.querySelector("#min-date").value;
        const to = document.querySelector("#max-date").value;
        filteredDate = arrayDate.filter(dateFilter);
        filteredDateNegate = arrayDate.filter(dateFilterNegate);

        function dateFilter(datee){
            return datee >= `${from}` && datee < `${to}`;
        }

        function dateFilterNegate(datee){
            return ! (datee >= `${from}` && datee < `${to}`);
        }


        console.log(arrayDate);
        console.log(filteredDate);
        console.log(filteredDateNegate);
        // }


        // $('.owl-carousel').owlCarousel({
        //     margin:10,
        //     nav:true,
        //     responsive:{
        //         0:{
        //             items:1
        //         },
        //         600:{
        //             items:3
        //         },
        //         1000:{
        //             items:5
        //         }
        //     }
        // });

        jQuery(".owl-item").each(function(){
            let classDate = jQuery("> div", $(this)).attr("class");
            jQuery(this).addClass(classDate);
            jQuery(this).hide();
        });

        filteredDateNegate.forEach(filteredDateShowNegate =>{
            jQuery(".owl-item.date-" + filteredDateShowNegate).appendTo('.eventi-fuori');
            // jQuery('.owl-item').trigger('add.owl.carousel')
            // jQuery(filteredDateShow).appendTo('.owl-stage');
        });

        filteredDate.forEach(filteredDateShow =>{
            jQuery(".owl-item.date-" + filteredDateShow).show();

            // jQuery('.owl-item').trigger('add.owl.carousel')
            // jQuery(filteredDateShow).appendTo('.owl-stage');
        });

        $('.owl-carousel').trigger('destroy.owl.carousel');

        $('#calendario-brescia').owlCarousel({
            dots: true,
            nav: true,
            navText:['<div class="owl-prev">❰</div>','<div class="owl-next">❱</div>'],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        });

        $('.owl-carousel').owlCarousel('update');
        jQuery(".owl-item").each(function(){
            let classDate = jQuery("> div", $(this)).attr("class");
            jQuery(this).addClass(classDate);
        });

        jQuery(document).ready(function() {
                jQuery('#scelta_mese_anno_indietro, #scelta_mese_anno_avanti').click(function() {
                    var data_prima = jQuery(fromInput).val();
                    var mese_prima = data_prima.substring(5,7);
                    var anno_prima = data_prima.substring(0,4);
                    var data_dopo = jQuery(toInput).val();
                    var mese_dopo = data_dopo.substring(5,7);
                    var anno_dopo = data_dopo.substring(0,4);
                    if (jQuery(this).is('#scelta_mese_anno_indietro')) {
                        mese_prima--;
                        if (mese_prima < 1) {
                            mese_prima = 12;
                            anno_prima--;
                        }
                        //console.log(mese_prima);

                        mese_dopo--;
                        if (mese_dopo < 1) {
                            mese_dopo = 12;
                            anno_dopo--;
                        }
                        //console.log(mese_dopo);
                    } else {
                        mese_prima++;
                        if (mese_prima > 12) {
                            mese_prima = 1;
                            anno_prima++;
                        }
                        //console.log(mese_prima);

                        mese_dopo++;
                        if (mese_dopo > 12) {
                            mese_dopo = 1;
                            anno_dopo++;
                        }
                        // console.log(mese_dopo);

                    }

                    const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

                    var data_prima = anno_prima + "-" + mese_prima.toString().padStart(2, '0') + "-01";
                    var data_dopo = anno_dopo + "-" + mese_dopo.toString().padStart(2, '0') + "-01";

                    var data_prima2 = anno_prima + ", " + mese_prima.toString().padStart(2, '0') + ", 01";

                    var options = {'month': 'long'};
                    var date = new Date(data_prima2).toLocaleString('it-IT', options);


                    jQuery("#scelta_mese_anno_label").text(date + ' ' + anno_prima);

                    //console.log("data prima" + data_prima);
                    //console.log("data dopo" + data_dopo);
                    jQuery(fromInput).val(data_prima);
                    jQuery(toInput).val(data_dopo);
                    jQuery('.cerca-data').click();

                });
                $ = jQuery;
                var today = new Date();
                var mm_int = today.getMonth() + 1;
                var mm = String(mm_int).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today_iso = yyyy + '-' + mm + '-01';

                mm_int = today.getMonth() + 2;
                if (mm_int > 12) {
                    mm_int = 1;
                    yyyy++;
                }
                mm = String(mm_int).padStart(2, '0');
                today_iso_piu_uno = yyyy + '-' + mm + '-01';

                jQuery(fromInput).val(today_iso);
                jQuery(toInput).val(today_iso_piu_uno);
                jQuery('.cerca-data').click();

            var data_prima = jQuery(fromInput).val();
            var mese_prima = data_prima.substring(5,7);
            var anno_prima = data_prima.substring(0,4);
            var data_dopo = jQuery(toInput).val();
            var mese_dopo = data_dopo.substring(5,7);
            var anno_dopo = data_dopo.substring(0,4);
            if (jQuery(this).is('#scelta_mese_anno_indietro')) {
                mese_prima--;
                if (mese_prima < 1) {
                    mese_prima = 12;
                    anno_prima--;
                }
                //console.log(mese_prima);

                mese_dopo--;
                if (mese_dopo < 1) {
                    mese_dopo = 12;
                    anno_dopo--;
                }
                //console.log(mese_dopo);
            } else {
                mese_prima++;
                if (mese_prima > 12) {
                    mese_prima = 1;
                    anno_prima++;
                }
                //console.log(mese_prima);

                mese_dopo++;
                if (mese_dopo > 12) {
                    mese_dopo = 1;
                    anno_dopo++;
                }
                // console.log(mese_dopo);

            }

            const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

            var data_prima = anno_prima + "-" + mese_prima.toString().padStart(2, '0') + "-01";
            var data_dopo = anno_dopo + "-" + mese_dopo.toString().padStart(2, '0') + "-01";

            var data_prima2 = anno_prima + ", " + mese_prima.toString().padStart(2, '0') + ", 01";

            var options = {'month': 'long'};
            var date = new Date(data_prima2).toLocaleString('it-IT', options);

            var currentTime = new Date();
            var month = mesi[currentTime.getMonth()];
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();

            var currentTime2 = new Date();
            var month2 = currentTime2.getMonth() + 1;
            var day2 = currentTime2.getDate();
            var year2 = currentTime2.getFullYear();
            if(day2 < 10){
                day2 = '0' + day2
            }
            // console.log(month2);
            // console.log(day2);
            // console.log(year2);

            console.log();
            // console.log(`.date.date-${year}-0${month2}-${day2}`);

            var vaiAllaSlide = $(`.date.date-${year}-0${month2}-${day2}`).index();
            $('#calendario-brescia').trigger('to.owl.carousel', vaiAllaSlide)

            jQuery("#scelta_mese_anno_label").text(month + ' ' + year);

        });

        jQuery('.cerca-data').on('click', function (){
            const from = document.querySelector("#min-date").value;
            const to = document.querySelector("#max-date").value;
            arrayDate.sort();

            filteredDate = arrayDate.filter(dateFilter);
            filteredDateNegate = arrayDate.filter(dateFilterNegate);

            function dateFilter(datee){
                return datee >= `${from}` && datee < `${to}`;
            }

            function dateFilterNegate(datee){
                return ! (datee >= `${from}` && datee < `${to}`);
            }

            console.log(arrayDate);
            console.log(filteredDate);
            console.log(filteredDateNegate);

            filteredDateNegate.forEach(filteredDateShowNegate =>{
                jQuery(".owl-item.date-" + filteredDateShowNegate).appendTo('.eventi-fuori');
            });

            filteredDate.forEach(filteredDateShow =>{
                jQuery(".eventi-fuori .owl-item.date-" + filteredDateShow).appendTo('.owl-stage');
            });
            // $('#calendario-brescia .owl-dots:last-child').remove();
            $('#calendario-brescia .owl-nav').remove();
            $('.owl-carousel').trigger('destroy.owl.carousel');
            $('#calendario-brescia').owlCarousel({
                dots: true,
                nav: true,
                navText:['<div class="owl-prev">❰</div>','<div class="owl-next">❱</div>'],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:4
                    }
                }
            });
            $('.owl-carousel').owlCarousel('update');
            jQuery(".owl-item").each(function(){
                let classDate = jQuery("> div", $(this)).attr("class");
                jQuery(this).addClass(classDate);
            });
        });

        $('.owl-item').each(function(index) {
            let check = false;
            let spanData = $('.date > span', $(this)).html()
            $('.date > div', $(this)).each(function(index) {
                if(index <=4){
                    // $(this).addClass('mark')
                }
                if(index > 4 && check === false){
                    check = true;
                    $(`<a href="/pagina-calendario?title=&field_data_in_calendario_value=${spanData}" class="link_vedi_tutto_data">vedi eventi del giorno</a>`).insertAfter(this)

                }
            });
            var today = new Date(spanData);
            var dd = String(today.getDate()).padStart(2, '0');
            var objToday = new Date(spanData),
                weekday = new Array('Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'),
                dayOfWeek = weekday[objToday.getDay()],
                dayOfMonth = today + ( objToday.getDate() < 10) ? '' + objToday.getDate() : objToday.getDate(),
                today = dayOfWeek + " " + dayOfMonth + "";

            $(`<h4 class="card-title pb-4 mb-10">${dayOfMonth}<span >${dayOfWeek} </span></h4>`).insertBefore($('.date > span.data', $(this)));
            // $('<span class="giorno-text">' +  + '</span>').insertBefore($('.date > h4 > span.giorno-numero', $(this)));

            console.log(today)
            $('.date > div', $(this)).each(function(index) {

                if($("a", $(this)).length == 2){
                    $("a:first-child", $(this)).removeAttr("href");
                    $("a:last-child", $(this)).attr("target", "_blank");

                }

            });
        });




    });