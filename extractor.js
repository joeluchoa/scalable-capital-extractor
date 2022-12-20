function crawl() {
    var _export = "";
    var header = 'isin, transaction_type, quantity, price, date';
    var data = JSON.parse($( '#__NEXT_DATA__' )[0].innerHTML);
    var data = data['props']['pageProps']['middlewareProps']['m5']['initialQueryResult'];
    console.log(data);

    jQuery.each(data, function(idx, val) {
        if (idx.startsWith('BrokerSecurityTransactionSummary') && val['isCancellationRequested'] == false && val['finalisationReason'] == 'SETTLED') {
            var type = val['cashTransactionType'];
            var isin = val['security']['id'];
            var quantity = data[ val['numberOfShares']['id'] ]['filled'];
            var amount = val['totalAmount'];
            var date = val['lastEventDateTime'];

            _export += isin + ';' + type + ';' + quantity + ';' + amount/quantity + ';' + date.substring(0, 10) + "\n";
        }
        if (idx.startsWith('BrokerCashTransaction') && val['cashTransactionType'] == 'DISTRIBUTION') {
            var type = val['type'];
            var isin = val['security'];
            var quantity = null;
            var amount = val['amount'];
            var date = val['lastEventDateTime'];
            _export += isin + ';' + type + ";0;" + amount + ';' + date.substring(0, 10) + "\n";    
        }
    });

    console.log(header + "\n" + _export);
    return true;
}

if (!window.jQuery) {  
    var file = document.createElement('script');
    file.setAttribute("type","text/javascript");
    file.setAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js");
    file.setAttribute("integrity", "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=");
    file.setAttribute("crossorigin", "anonymous");
    file.addEventListener('load', () => {
    console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
    // use jQuery below
    });
    document.getElementsByTagName('head')[0].appendChild(file);
    console.log("Plugins werden geladen..."); 
    setTimeout(() => { console.log("Plugin geladen!"); crawl(); }, 3000);
} else {
    crawl();
}
