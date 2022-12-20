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

function extractTransaction(val) {
    return {
        id: val['id'],
        amount: val['amount'] || 0.0,
        currency: val['currency'] || '',
        description: val['description'] || '',
        dateTime: val['lastEventDateTime'] || '',
        isin: val['relatedIsin'] || val['isin'] || '',
        quantity: val['quantity'] || 0,
        securityTransactionType: val['securityTransactionType'] || '',
        status: val['status'] || 'CANCELLED',
        type: val['side'] || val['cashTransactionType'] || ''
    };
}

function crawl() {
    var _export = "";
    var data = JSON.parse($( '#__NEXT_DATA__' )[0].innerHTML);
    var data = data['props']['pageProps']['middlewareProps']['m5']['initialQueryResult'];

    jQuery.each(data, function(idx, val) {
        var transaction = extractTransaction(val);
        if (transaction.status == "SETTLED") {           
             console.log(transaction);   
        }
    });

    return true;
}

if (!window.jQuery) {  
    loadJQuery();
}
setTimeout(() => { crawl(); }, 3000);
