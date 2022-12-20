function loadJQuery() {
    var file = document.createElement('script');
    file.setAttribute("type","text/javascript");
    file.setAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js");
    file.setAttribute("integrity", "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=");
    file.setAttribute("crossorigin", "anonymous");
    file.addEventListener('load', () => {
        console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
    });
    document.getElementsByTagName('head')[0].appendChild(file);
}

function exportCSV(transactions) {
    var fields = Object.keys(transactions[0])
    var csv = transactions.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName])
        }).join(' , ')
    });
    csv.unshift(fields.join(' , ')) // add header column
    csv = csv.join('\r\n');
    console.log(csv)
}

function fmt(num) {
    return parseFloat(num).toFixed(2);
}

function extractTransaction(val) {
    return {
        amount: fmt(val['amount'] || 0.0),
        currency: val['currency'] || '',
        description: val['description'] || '',
        dateTime: val['lastEventDateTime'] || '',
        isin: val['relatedIsin'] || val['isin'] || '',
        quantity: fmt(val['quantity'] || 0),
        type: val['side'] || val['cashTransactionType'] || ''
    };
}

function crawl() {
    var rawData = JSON.parse($( '#__NEXT_DATA__' )[0].innerHTML);
    var data = rawData['props']['pageProps']['middlewareProps']['m5']['initialQueryResult'];

    var transactions = [];
    jQuery.each(data, function(idx, val) {
        if (val['status'] == "SETTLED") {           
             transactions.push(extractTransaction(val));
        }
    });

    exportCSV(transactions);
}

if (!window.jQuery) {  
    loadJQuery();
}
setTimeout(() => { crawl(); }, 3000);
