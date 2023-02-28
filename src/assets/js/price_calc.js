const price_calc_wrapper = document.querySelector('#price_calc_wrapper')
const price_res_wrapper = document.querySelector('#price_res_wrapper')

let all_columns = []

let calc_buttons = []

function setCalcButtons(){
    all_columns.forEach(column => {
        getColumnBtnList(column).forEach(btn => {
            calc_buttons.push(btn)
        })
    })
}

function getColumnBtnList(column){
    return document.querySelectorAll(`.calc_button[data-column="${column}"]`)
}

function getSelectedColumnBtns(){
    return document.querySelectorAll('.calc_button.selected')
}

function isDisabledBtn(btn){
    return btn.classList.contains('disabled')
}

function disableBtn(btn){
    if(!isDisabledBtn(btn)){
        btn.classList.add('disabled')
    }
}

function unDisableBtn(btn){
    if(isDisabledBtn(btn)){
        btn.classList.remove('disabled')
    }
}

function unDisabledBtns(btns){
    btns.forEach(btn => {
        unDisableBtn(btn)
    })
}

function disabledBtns(btns){
    btns.forEach(btn => {
        disableBtn(btn)
    })
}

function isSelectedBtn(btn){
    return btn.classList.contains('selected')
}

function isSelectedAnyColumnBtns(){
    let selected_any = false
    all_columns.forEach(column => {
        getColumnBtnList(column).forEach(btn => {
            if(isSelectedBtn(btn)){
                selected_any = true
            }
        })
    })
    return selected_any
}

function selectBtn(btn){
    if(!isSelectedBtn(btn)){
        btn.classList.add('selected')
    }
}

function unSelectBtn(btn){
    if(isSelectedBtn(btn)){
        btn.classList.remove('selected')
    }
}

function unSelectBtns(btns){
    btns.forEach(btn => {
        unSelectBtn(btn)
    })
}

function isSelectedColumnList(column){
    let selected_any = false
    getColumnBtnList(column).forEach(btn => {
        if(isSelectedBtn(btn)){
            selected_any = true
        }
    })
    return selected_any
}

function unSelectColumnList(column){
    const btns = getColumnBtnList(column)
    unSelectBtns(btns)
}


function updatedBtns(btns){
    btns.forEach(btn => {
        if(!isDisabledBtn(btn)){
            btn.addEventListener('click', ev => {
                const btn_column = +btn.dataset.column

                if(isSelectedColumnList(btn_column) && !isSelectedBtn(btn)){
                    unSelectColumnList(btn_column)
                    selectBtn(btn)
                }
                else if(isSelectedColumnList(btn_column) && isSelectedBtn(btn)){
                    unSelectColumnList(btn_column)
                }
                else if(!isSelectedColumnList(btn_column) && !isSelectedBtn(btn)){
                    selectBtn(btn)
                }

                if(isSelectedAnyColumnBtns()){
                    renderPriceCalculation()
                }
                else{
                    price_res_wrapper.innerHTML = ''
                }
            })
        }
    })
}


function buildCalcPriceQuery(){
    const selected_btns = getSelectedColumnBtns()
    let query = '?'
    let column_row_pairs = []

    selected_btns.forEach(btn => {
        column_row_pairs.push(`${btn.dataset.column}=${btn.dataset.row}`)
    })

    query += column_row_pairs.join('&')

    return query
}


async function getColumns(){
    return await fetch(`${API_URI}/price-calculation/columns/`, {
        method: 'GET'
    })
}

async function renderPriceCalculator(){
    const columns_response = await getColumns()

    if(columns_response.status !== 200){
        price_calc_wrapper.innerHTML = '<h3 style="text-align: center;">Не вдалося завантажити калькулятор</h3>'
        return false
    }
    else{
        const colums_json = await columns_response.json()
        const columns = colums_json.columns
        console.log(columns)
        if(columns.length < 1){
            price_calc_wrapper.innerHTML = '<h3 style="text-align: center;">Не вдалося завантажити калькулятор</h3>'
            return false
        }

        let columns_btns_str = ''
        columns.forEach(column => {
            all_columns.push(column.id)
            columns_btns_str += `<div class="col-12 col-sm-12 col-md-6 col-lg d-flex flex-column align-items-center mt-3">
                                        <h3>${column.name}</h3>`

            column.rows.forEach(row => {
                columns_btns_str += `<div class="calc_button" data-column="${column.id}" data-row="${row.id}">
                                        <div class="calc_button_text">${row.name}</div> 
                                        <i class="fa-solid fa-info calc_button_desc" data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-content="${row.description}"></i>
                                    </div>`
            })

            columns_btns_str += '</div>'
        })

        let calculator_html = `<div class="row">${columns_btns_str}</div>`
        price_calc_wrapper.innerHTML = calculator_html
        setPopovers()
        return true
    }

}

async function getPriceCalculation(query){
    return await fetch(`${API_URI}/price-calculation/calculate/${query}`, {
        method: 'GET',
    })
}

async function renderPriceCalculation(){
    const calculation_response = await getPriceCalculation(buildCalcPriceQuery())
    if(calculation_response.status !== 200){
        price_res_wrapper.innerHTML = '<h3 style="text-align:center;">Не вдалося розрахувати</h3>'
        return false
    }
    else{
        const calculation_json = await calculation_response.json()
        let price_res_html = `<div class="title_b mb-3">
                                <h2 style="padding: 15px 15px;">Розрахунок</h2>
                            </div>
                            <div class="row d-flex justify-content-center">`
        
        calculation_json.price.local_prices.forEach(price => {
            price_res_html += `<div class="col-12 col-sm-12 col-md-6 col-lg d-flex flex-column align-items-center">
                                 <h3>${price.column}</h3>
                                 <div class="d-flex justify-content-between" style="width: 100%">
                                   <div style="border-left: 3px solid #272733; padding-left: 5px;"><h4>Ціна:</h4></div>
                                   <div><h4>~$${price.price}</h4></div>
                                 </div>
                                 <div class="d-flex justify-content-between" style="width: 100%">
                                   <div style="border-left: 3px solid #272733; padding-left: 5px;"><h4>Термін:</h4></div>
                                   <div><h4>${price.estimate}</h4></div>
                                 </div>
                               </div>`
        })

        price_res_html += `</div> <h3 class="mt-4" style="text-align: end;">Всього: ~${calculation_json.price.total_price}</h3>`
        price_res_wrapper.innerHTML = price_res_html
    }    
}

document.addEventListener('DOMContentLoaded', async (ev) => {
    const $price_calc_text = document.querySelector('#price_calc_text')
    try{
        const is_rendered_calculator = await renderPriceCalculator()
        if(is_rendered_calculator){
            setCalcButtons()
            updatedBtns(calc_buttons)
        }
    }
    catch(error){
        $price_calc_text.innerHTML = '<h4>Щось пішло не так... :( <br /> Не вдалося завантажити калькулятор. Будь ласка, спробуйте пізніше або <a href="contacts.html">зв`яжіться з нами</a></h4>'
        console.log(`Failed render price calculation section. Error: ${error}`)
    }
})
