import Block from "../core/Block";

const validateTypes: {
    Login: string,
    Name: string,
    Phone: string,
    Email: string,
    Password: string,
    Message: string
} = {
    Login: 'login',
    Name: 'name',
    Phone: 'phone',
    Email: 'email',
    Password: 'password',
    Message: 'message'
};

export function validate(type: string = '', value: string): string {
    if (value.length === 0) {
        return 'Поле не может быть пустым';
    }

    switch (type) {
        case validateTypes.Login:
            if (value.length < 3) {
                return 'Логин должен быть длиннее 3-х символов';
            } else if (value.length > 20) {
                return 'Логин не должен быть длиннее 20-ти символов';
            } else if (value.search(/[a-zA-Z]/) === null) {
                return 'Логин должен содержать хотя бы одну букву';
            } else if (value.match(/[\[,\],\\,\/,\^,\$,\.,\|,\?,\*,\+,\(,\),\{,\},%,:,\-,`,&]/) !== null) {
                return 'Логин не должен содержать спецсимволы';
            } else if (value.match(/\W/)) {
                return 'В логине должны использоваться только буквы латинского алфавита';
            }
            break;

        case validateTypes.Name:
            if (value.match(/[^a-z,A-Z,а-я,А-Я,\-]/)) {
                return 'Значение должно содержать только буквы или дефис';
            }
            else if (value.match(/^[A-ZА-Я]/) === null) {
                return 'Первая буква должна быть заглавной';
            }
            break;

        case validateTypes.Phone:
            if (value.match(/^[\+,0-9]/) === null) {
                return 'Номер должен начинаться с цифры или +';
            }
            else if (value.match(/.\D+/) !== null) {
                return 'Номер должен содержать только цифры';
            }
            else if (value.length < 10 || value.length > 15) {
                return 'Номер должен быть длинной от 10 до 15 символов';
            }

            break;

        case validateTypes.Email:
            if (value.match(/^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i) === null) {
                return 'Email имеет неверный формат';
            }
            break;

        case validateTypes.Password:
            if (value.length < 8) {
                return 'Пароль должен быть длиннее 7-ми символов';
            } else if (value.length > 40) {
                return 'Пароль не должен быть длиннее 40-ми символов';
            } else if (value.match(/[A-Z]/) === null) {
                return 'Пароль должен содержать хотя бы одну заглавную букву';
            } else if (value.match(/[0-9]/) === null) {
                return 'Пароль должен содержать хотя бы одину цифру';
            }
            break;
    }

    return '';
}

export function handleValidateField(fieldComponent: Block): boolean {
    const inputValue = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).value;
    const validateRule = fieldComponent.children.inputComponent.getContent().getAttribute('validateRule') || '';

    let error = validate(validateRule, inputValue);
    const errorComponent = fieldComponent.children.errorTextComponent;
    errorComponent.setProps({
        className: (error !== '') ? 'error-label_show' : '',
        text: error
    });

    return !error;
}

export function checkPasswordMatch(fieldPassword: Block, fieldPasswordRepeat: Block): boolean {
    let firstPassword: string = (fieldPassword.children.inputComponent.getContent() as HTMLInputElement).value;
    let secondPassword: string = (fieldPasswordRepeat.children.inputComponent.getContent() as HTMLInputElement).value;

    return firstPassword === secondPassword;
}

export function resetValidateField(fieldComponent: Block): void {
    const errorComponent: Block = fieldComponent.children.errorTextComponent;
    errorComponent.setProps({
        className: '',
        text: ''
    });
}

export function validateForm(listFields: Block[]): boolean {
   return listFields.reduce((flag: boolean, component: Block) => {
       const errorTextNode: HTMLElement = component.children.errorTextComponent.getContent();
       let status: boolean = (errorTextNode.textContent !== '') ? false : handleValidateField(component);
       return flag && status;
   }, true);
}