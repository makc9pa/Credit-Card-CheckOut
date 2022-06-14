const cardNumberInput = document.querySelector('.checkout__input_number');
const expiryInput = document.querySelector('.checkout__input_expiry');
const cvvInput = document.querySelector('.checkout__input_cvv');

const cardNumberMask = new Inputmask('9999 9999 9999 9999', {placeholder: "x"});
const expiryMask = new Inputmask({ alias: "datetime", inputFormat: "mm/yy"}, {placeholder: "mm/yy"});
const cvvInputMask = new Inputmask('999', {placeholder: "x"});

const validation = new JustValidate('.checkout__form', {
    errorLabelStyle: {
        color: '#52006a',
    }
});

cardNumberMask.mask(cardNumberInput);
expiryMask.mask(expiryInput);
cvvInputMask.mask(cvvInput);


validation
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'The field is required',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'The field must contain a minimum of 3 characters',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'The field must contain a maximum of 30 characters',
        },
    ])
    .addField('#card', [
        {
            rule: 'required',
            errorMessage: 'The field is required',
        },
        {
            validator: (value) => {
                const cardNumber = cardNumberInput.inputmask.unmaskedvalue();
                return Number(cardNumber) && cardNumber.length === 16;
            },
            errorMessage: 'The field must contain 16 digits',
        },
    ])
    .addField('#expiry', [
        {
            rule: 'required',
            errorMessage: 'The field is required',
        },
        {
            validator: (value) => {
                const expiryDate = expiryInput.inputmask.unmaskedvalue();
                const currentMonth = new Date().getMonth() + 1;
                const currentYear= new Date().getFullYear().toString().substring(2, 4);
                const month = +expiryDate.split('/').join('').slice(0, 2);
                const year = +expiryDate.split('/').join('').slice(2, 4);
                
                const monthCheck = (() => {
                    if (year === +currentYear) { return month >= currentMonth } 
                    else 
                    {
                        if (year <= 30 && year >= currentYear) { return true }
                    }
                })
                return (monthCheck());
            },
            errorMessage: 'The date must be from the current date to December 2030',
        },
    ])
    .addField('#cvv', [
        {
            rule: 'required',
            errorMessage: 'The field is required',
        },
        {
            validator: (value) => {
                const CVVNumber = cvvInput.inputmask.unmaskedvalue();
                return Number(CVVNumber) && CVVNumber.length === 3;
            },
            errorMessage: 'The field must contain 3 digits',
        },
    ])