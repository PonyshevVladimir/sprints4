const upLoaderInput = document.querySelector(".file-uploader__input");
const mainForm = document.querySelector(".main-form");

upLoaderInput.addEventListener("change", function (event) {
    const upLoadFile = event.target.files[0];
    const reader = new FileReader();

    if (upLoadFile) {
        mainForm.innerHTML = '';
        reader.readAsText(upLoadFile);
    }

    reader.addEventListener('load', function () {
        const rawText = reader.result;
        const dataObject = JSON.parse(rawText);

        const nameTitle = document.createElement('h2')
        nameTitle.textContent = dataObject.name;
        nameTitle.className = 'main-form__title';
        mainForm.appendChild(nameTitle);


        if (dataObject.fields) {
            const itemsWrapper = document.createElement('div');
            itemsWrapper.className = 'main-form__fields';

            dataObject.fields.forEach(function (item) {
                const itemWrapper = document.createElement('div');


                if (item.label) {
                    const labelEl = document.createElement('label');
                    labelEl.textContent = item.label;
                    labelEl.className = 'main-form__label';
                    itemWrapper.appendChild(labelEl);
                }


                const tagOthers = {
                    "textarea": "textarea",
                    "technology": "select"
                };
                const tagName = tagOthers[item.input.type] || "input";
                const fieldEl = document.createElement(tagName);
                if (fieldEl.tagName === 'input') {
                    fieldEl.type = item.input.type;
                }
                fieldEl.name = item.input.type;
                fieldEl.className = 'main-form__input';
                if (item.input.placeholder) {
                    fieldEl.placeholder = item.input.placeholder;
                }
                fieldEl.required = item.input.required;
                if (item.input.type === 'checkbox') {
                    fieldEl.checked = item.input.checked;
                }
                if (item.input.multiple) {
                    fieldEl.multiple = item.input.multiple;
                }
                if (item.input.colors) {
                    fieldEl.colors = item.input.colors;
                }
                if (fieldEl.tagName === 'SELECT' && item.input.technologies) {

                    item.input.technologies.forEach(function (techName) {
                        const optionEl = document.createElement('option');
                        optionEl.value = techName;
                        optionEl.textContent = techName;
                        fieldEl.appendChild(optionEl);
                    });
                }

                itemWrapper.appendChild(fieldEl);
                itemWrapper.className = 'main-form__field';

                itemsWrapper.appendChild(itemWrapper);
            });

            mainForm.appendChild(itemsWrapper);
        }

        if (dataObject.references) {
            const itemsWrapper = document.createElement('div');
            itemsWrapper.className = 'main-form__references';

            dataObject.references.forEach(function (item) {
                const itemWrapper = document.createElement('div');
                itemWrapper.className = 'main-form__references';

                if(item.input){
                    const inputEl = document.createElement('input');
                    inputEl.type = item.input.type;
                    inputEl.checked = item.input.checked;
                    inputEl.required = item.input.required;
                    itemWrapper.appendChild(inputEl);

                    if (item.label) {
                        const labelEl = document.createElement('label');
                        labelEl.textContent = item.label;
                        labelEl.className = 'main-form__label';
                        itemWrapper.appendChild(labelEl);
                    }
                }

                if(item.text_without_ref){
                    const textEl = document.createElement('span');
                    textEl.textContent = item.text_without_ref;
                    textEl.className = 'main-form__reference-text';
                    itemWrapper.appendChild(textEl);
                }

                if(item.text && item.ref){
                    const linkEl = document.createElement('a');
                    linkEl.textContent = item.text;
                    linkEl.href = item.ref;
                    linkEl.className = 'main-form__reference-link';
                    itemWrapper.appendChild(linkEl);
                }
                itemsWrapper.appendChild(itemWrapper);
            });
            mainForm.appendChild(itemsWrapper);
        }

        if (dataObject.buttons){
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'main-form__buttons';

            dataObject.buttons.forEach(function (item, index) {
                const buttonEl = document.createElement('button');
                buttonEl.textContent = item.text;
                if (index === 0) {
                    buttonEl.type = 'submit';
                    buttonEl.className = 'main-form__button-submit';
                } else {
                    buttonEl.type = 'button';
                    buttonEl.className = 'main-form__button';
                }
                itemWrapper.appendChild(buttonEl);
            });
            mainForm.appendChild(itemWrapper);
        }
    });
});

mainForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userAnswers = Object.fromEntries(formData.entries());
    console.log(userAnswers);
})

