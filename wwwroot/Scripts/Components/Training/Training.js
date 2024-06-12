var Training = {
    start_action: function () {
        new TemplateRenderer({ obj: "TheTraining" }, "Training", "~/wwwroot/Scripts/Components/Training/Training.html").start_action().
            then(jData => {
                var carousel = new bootstrap.Carousel(document.querySelector('#Training'))    
                carousel.cycle(true);
            });
    }
}