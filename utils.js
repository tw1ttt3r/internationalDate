function cleanElement(elem) {
    elem.value = '';
}

function launchAlert(msg) {
    alert(msg);
}

function main(data, timeZone) {
    document.querySelector('#dates').innerHTML = `<h1>(${timeZone}): ${data}</h1>`;
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
    const hora = hour.length === 3 ? '0'+hour.slice(0,1) : hour.slice(0,2);
    const DateTime = luxon.DateTime;
    const specifyOffset = DateTime.fromISO(`${today.getFullYear()}-${today.getMonth() < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate() < 10 ? '0'+today.getDate() : today.getDate()}T${hora}:${hour.slice(-2)}:00-05:00`, { zone: 'America/Mexico_City' });
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    var rezoned = specifyOffset.setZone(timeZone);
    main(rezoned, timeZone);
}

function validateMilitarHour(hour) {
    const hora = hour.length === 4 ? hour.slice(0,2) : hour.slice(0,1);
    const minutos = hour.slice(-2);
    return (Number(hora) <= 24 && Number(minutos) <= 59);
}