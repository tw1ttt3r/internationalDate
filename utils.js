const months = [
    'January',
    'February',
    'March',
    'April',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function cleanElement(elem) {
    elem.value = '';
}

function launchAlert(msg) {
    alert(msg);
}

function main(elem) {
    elem.innerHTML = '<h1>HOlA MUNDO</h1>';
}

function stopbubling(e) {
    e.preventDefault();
    e.stopPropagation();
}

function validaCaracteres(cadena) {
    const validacion = Array.from(cadena).reduce( (acc, curr) => {
        return [...acc, isNaN(Number(curr))];
    }, []);
    return validacion.includes(true);
}

function generar(e) {
    stopbubling(e);
    const hour = e.path[1].elements[0];
    if (hour.value === '') {
        launchAlert('Proporciona el la hora a convertir');
        cleanElement(hour);
    } else {
        if (hour.value.length <= 2 || hour.value.length > 5) {
            launchAlert('Valor valido: mínimo 3 y máximo 4 caracteres');
            cleanElement(hour);
        } else {
            const validacion = validaCaracteres(hour.value);
            if (validacion) {
                launchAlert('Solo admite horas en formato militar 0000');
                cleanElement(hour);
            } else {
                if (!validateMilitarHour(hour.value)) {
                    launchAlert('Solo admite hast 24 horas y 59 minutos');
                    cleanElement(hour);
                } else {
                    console.log('hora: ', hour.value);
                    createDate(hour.value);
                    cleanElement(hour);
                }
            }
        }
    }
}

function createDate(hour) {
    const today = new Date();
    console.log('year', today.getFullYear());
    console.log('month', today.getMonth());
    console.log('day', today.getDate());
    const hora = hour.length === 4 ? hour.slice(0,2) : hour.slice(0,1)
    console.log('hour', hora);
    console.log('minutes', hour.slice(-2));
    console.log('today---', today);
    const newDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hora, hour.slice(-2));
    console.log('newDay---', newDay);
    console.log('locale---', newDay.toLocaleDateString('es-MX', options));
    console.log('zonaHororia---', Intl.DateTimeFormat().resolvedOptions());
}

function validateMilitarHour(hour) {
    const hora = hour.length === 4 ? hour.slice(0,2) : hour.slice(0,1);
    const minutos = hour.slice(-2);
    return (Number(hora) <= 24 && Number(minutos) <= 59);
}