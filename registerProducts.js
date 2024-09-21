class Products {
    constructor(name, price, description, availability){
        this.name = name;
        this.price = price;
        this.description = description;
        this.availability = availability;

    }

    validateData(){
        for(let index in this){
            if(this[index] === undefined || this[index] === ""){
                console.log(`Fill in all the fields correctly`)
                return false;
            }
        }

        return true;
    }

}

class DataBase{
    constructor(){
        this.initDataBase();
    }

    initDataBase(){
        const idKey = localStorage.getItem('idkey');
        if(idKey === null){
            localStorage.setItem('idkey', '0');
        }
    }


    createProduct(product){
        const idKey = this.getNextIdkey();
        localStorage.setItem(idKey, JSON.stringify(product))
        localStorage.setItem('idkey', idKey.toString());
    }


    getNextIdkey (){
        const currentIdkey = localStorage.getItem('idkey');
        console.log(currentIdkey)
        return parseInt(currentIdkey) + 1;

    }
    
}

const dataBase = new DataBase();

function  registerProducts(){
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let description =  document.getElementById('description').value;
    let availability = document.querySelector('input[name = option]:checked').value;  
    
    const products =  new Products(name, price, description, availability);

    if(products.validateData()){
        dataBase.createProduct(products);
        alert('Product registered');
    }
    else{
        alert('Please fill in all fields');
        
    }
    clearFields();  

    listProducts();
}


function clearFields(){
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    let radio = document.querySelector('input[name = option]:checked'); 
    radio.checked = false;
}


function listProducts (){
    let table =  document.getElementById('table');
    const idkey = localStorage.getItem('idkey');
    table.innerHTML = '';

    
    const rowHead = table.insertRow(0);
    rowHead.insertCell(0).innerHTML = 'Name';
    rowHead.insertCell(1).innerHTML = 'Price';

    for(let i = 1; i <= idkey; i++){
        try{
            const product = JSON.parse(localStorage.getItem(i));
            if(product !== null){
                let row = table.insertRow();
                
                row.insertCell(0).innerHTML = product.name;
                row.insertCell(1).innerHTML = product.price;

                const btn = document.createElement('button');
                btn.className = 'delete';
                btn.id = product[i];
                btn.innerHTML = 'Delete';
                btn.onclick = () => {
                    if (confirm('Are you sure you want to delete this task?')) {
                        localStorage.removeItem(i);
                        listProducts(); // Atualiza a lista de tarefas
                    }
                };
        
                row.insertCell(2).append(btn);
            }

        }catch (e){
            console.error(`error loading product with idkey ${i}`, e);
        }
    }  

    
}


function showTable() {
    let form = document.getElementById('listOrRegister');
    form.style.display = 'none'
    let table = document.getElementById('table-container');
    table.style.display = 'flex'
    listProducts();
}

function showForm() {
    document.getElementById('listOrRegister').style.display = 'flex';
    document.getElementById('table-container').style.display = 'none';
    document.getElementById('table').innerHTML = '';  // Limpa a tabela para evitar duplicações
}


const btn_Add = document.getElementById('btn_Add');

btn_Add.addEventListener('click', () => {
    registerProducts();
    showTable();
})

const btn_List = document.getElementById('btn_List');

btn_List.addEventListener('click', () => {
    showForm();
})