// Custom price range slider created by Pawan Mall | www.pawanmall.net

let rangeSlider = ((containerSelector, minSelector, maxSelector, selectionSelector, inputCallback, changeCallback) => {
    inputCallback = inputCallback || function () { };
    changeCallback = changeCallback || function () { };
    let timeout;
    let sliderContainer = document.querySelector(containerSelector);
    let sliderMinElement = document.querySelector(minSelector);
    let sliderMaxElement = document.querySelector(maxSelector);
    let sliderSelectionElement = document.querySelector(selectionSelector);
    let values = { min: sliderMinElement.value, max: sliderMaxElement.value };

    sliderMinElement.addEventListener('input', e => {
        sliderTimeout(() => { valueChanged(e); });
    });

    sliderMaxElement.addEventListener('input', e => {
        sliderTimeout(() => { valueChanged(e); });
    });

    sliderMinElement.addEventListener('change', () => { changeCallback(values); });
    sliderMaxElement.addEventListener('change', () => { changeCallback(values); });

    return {
        setHandles: data => {
            data = data || {};

            if (data.min) {
                sliderMinElement.value = data.min;
                valueChanged({ target: sliderMinElement });
            }

            if (data.max) {
                sliderMaxElement.value = data.max;
                valueChanged({ target: sliderMaxElement });
            }
        }
    };


    function valueChanged(event) {
        if (event.target === sliderMinElement && +sliderMinElement.value >= +sliderMaxElement.value) {
            sliderMinElement.value = +sliderMaxElement.value - 5;
            return event.preventDefault();
        }

        if (event.target === sliderMaxElement && +sliderMinElement.value >= +sliderMaxElement.value) {
            sliderMaxElement.value = +sliderMinElement.value + 5;
            return event.preventDefault();
        }

        values.min = sliderMinElement.value;
        values.max = sliderMaxElement.value;

        sliderSelectionElement.style.left = +sliderMinElement.value / +sliderMaxElement.getAttribute('max') * 100 + '%';
        sliderSelectionElement.style.right = +sliderMaxElement.value / +sliderMaxElement.getAttribute('max') * -100 + 100 + '%';
        inputCallback(values);
    }

    function sliderTimeout(callback) {
        clearTimeout(timeout);
        timeout = setTimeout(callback, 10);
    }
})('.range-slider', '.range-slider-min', '.range-slider-max', '.range-slider-selection', values => {
    // console.log('values changed!', values);
    // document.querySelector('.display1').innerHTML = '₹ '+ values.min + ', ₹ ' + values.max;
    document.querySelector('.minmaxprice').value = values.min + ',' + values.max;
    document.querySelector('.minprice').innerHTML = '₹ ' + values.min;
    document.querySelector('.maxprice').innerHTML = '₹ ' + values.max;
}, values => {
    // console.log('change done!', values);
});

rangeSlider.setHandles({ min: 5000, max: 250000 });

  // console.log('inited!');
  // https://seiyria.com/bootstrap-slider/#example-13
  // $("#BudgetRange").slider({ min: 5000, max: 250000, value: [25000, 55000], focus: true });
