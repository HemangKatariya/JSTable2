let array = []
let img = ''
let newimage = ''
if (localStorage.getItem('data')) {
    array = JSON.parse(localStorage.getItem('data'))

}

if (localStorage.getItem('email')) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].email == localStorage.getItem('email')) {
            document.getElementById('name').value = array[i].fname
            document.getElementById('email').value = array[i].email
            document.getElementById('pass').value = array[i].pass
            document.getElementById('phone').value = array[i].phone
            document.getElementById('target').src = array[i].img
        }
    }
}
function submit() {

    let data = {
        fname: document.getElementById('name').value,
        email: document.getElementById('email').value,
        pass: document.getElementById('pass').value,
        phone: document.getElementById('phone').value,
        img: img,

    }
    let alreadyadded = false
    for (let i = 0; i < array.length; i++) {
        if (array[i].email == document.getElementById('email').value && array[i].pass == document.getElementById('pass').value) {
            alreadyadded = true
        }
    }
    if (alreadyadded) {
        alert('Already  exists , Please use different email id')
        window.location.href = '/index.html'
    } else {
        array.push(data)
        window.location.href = '/login.html'
    }
    console.log(array);
    localStorage.setItem('data', JSON.stringify(array))
}



function login() {

    let login = false
    for (let i = 0; i < array.length; i++) {
        if (array[i].email == document.getElementById('Lemail').value && array[i].pass == document.getElementById('Lpass').value) {
            login = true
        }
    }
    if (login) {
        alert('🙂 You have successfully logged in')
        window.location.href = '/table.html'

    } else {
        alert('❌ Please check your email & password')
    }
}


function createTable() {

    document.getElementById('table').style.display = 'block'

    JSON.parse(localStorage.getItem('data'))

    for (let i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        row.setAttribute('id', 'row' + i)

        let fname = document.createElement('td');
        let email = document.createElement('td');
        let pass = document.createElement('td');
        let phone = document.createElement('td');
        let imgtd = document.createElement('td')
        let imgel = document.createElement('img')
        let remove = document.createElement('button')
        remove.setAttribute('id', 'remove')
        remove.setAttribute('onclick', 'remove(' + i + ', "' + array[i].email + '" )')
        let edit = document.createElement('button')
        edit.setAttribute('id', 'edit')
        edit.setAttribute('onclick', 'edit(' + i + ',"' + array[i].email + '")')

        fname.innerHTML = array[i].fname
        email.innerHTML = array[i].email
        pass.innerHTML = array[i].pass
        phone.innerHTML = array[i].phone
        imgel.src = array[i].img
        remove.innerHTML = 'remove'
        edit.innerHTML = 'edit'

        row.appendChild(fname)
        row.appendChild(email)
        row.appendChild(pass)

        row.appendChild(phone)
        imgtd.appendChild(imgel)
        row.appendChild(imgtd)
        row.appendChild(remove)
        row.appendChild(edit)
        table.appendChild(row)

    }

}

function remove(hemang, email) {
    parent1 = document.getElementById('table')
    data1 = document.getElementById('row' + hemang)
    parent1.removeChild(data1)

    array = array.filter((item) => item.email !== email);
    console.log(array);
    localStorage.setItem('data', JSON.stringify(array))
}

function edit(i, email) {

    console.log(email);
    localStorage.setItem('email', email)

    window.location.href = '/index.html'
}

function update() {
    let data = JSON.parse(localStorage.getItem('data'))

    let objIndex = data.findIndex((obj => obj.email === localStorage.getItem('email')));
    data[objIndex].email = document.getElementById('email').value
    data[objIndex].fname = document.getElementById('name').value
    data[objIndex].pass = document.getElementById('pass').value
    data[objIndex].phone = document.getElementById('phone').value
    data[objIndex].img = img
    console.log("After update: ", data[objIndex])
    localStorage.setItem('data', JSON.stringify(data))
    localStorage.removeItem('email')
    window.location.href = '/login.html'
}


const input = document.getElementById('image');
input.addEventListener('change', (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        img = reader.result
        document.getElementById('target').src = img
    });
});


function handleSubmit() {

    let editKarvanuChhe = false


    for (let i = 0; i < array.length; i++) {
        if (localStorage.getItem('email')) {
            editKarvanuChhe = true
        }

    }

    if (editKarvanuChhe) {
        update()
    } else {
        submit()
    }

}