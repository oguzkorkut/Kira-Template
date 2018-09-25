import { User } from './../entity/user';
export const getLocalization = (culture: string, user: User): any => {
    let localization = null;
    const settings = {'theme':'j32bitSmall','decimalseparator':',','thousandsseparator':'.','percentsymbol':'%','currencysymbol':'₺','hiddenColumns':{'timeDeposit':[],'govBond':['nominalAmount'],'cordBonds':[],'cpiBond':[],'equity':[],'repo':[],'imm':[],'euroDolarBond':[],'euroEuroBond':[]},'gridState':[['AK1-govBond',['bondName','isin','issuer','maturityDate','scenarioAmount','nominalAmount','duration','portfolioValue','cleanPrice','xIRR','dirtyPrice','valuationPrice','portfolioDuration','portfolioWeight','bmDuration','bmWeight','bmDiffDays','bmDiffPercentage','income','portfolioIncome','bmIncome','bucket','previousPortfolioValue','currencyCode','couponInterest','daysToMaturity']]],'sortableState':[['AK1',['govBond','corpBond','cpiBond','repo','imm','totals']],['AVB2',['euroDolarBond','euroEuroBond','timeDeposit','repo','totals']]]}; //JSON.parse(user.settings);
    switch (culture) {
        case 'tr':
        default:
            localization = {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': '/',
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ':',
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 1,
                days: {
                    // full day names
                    names: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                    // abbreviated day names
                    namesAbbr: ['Paz', 'Pzt', 'Sal', 'Çrş', 'Prş', 'Cum', 'Cmt'],
                    // shortest day names
                    namesShort: ['Pa', 'Pz', 'Sl', 'Çş', 'Pş', 'Cm', 'Ct']
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be '' if not lunar)
                    names: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık', ''],
                    // abbreviated month names
                    namesAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '']
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ['AM', 'am', 'AM'],
                PM: ['PM', 'pm', 'PM'],
                eras: [
                    // eras in reverse chronological order.
                    // name: the name of the era in this culture (e.g. A.D., C.E.)
                    // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                    // offset: offset in years from gregorian calendar
                    { 'name': 'A.D.', 'start': null, 'offset': 0 }
                ],
                twoDigitYearMax: 2029,
                patterns: {
                    // short date pattern
                    d: 'M/d/yyyy',
                    // long date pattern
                    D: 'dddd, MMMM dd, yyyy',
                    // short time pattern
                    t: 'h:mm tt',
                    // long time pattern
                    T: 'h:mm:ss tt',
                    // long date, short time pattern
                    f: 'dddd, MMMM dd, yyyy h:mm tt',
                    // long date, long time pattern
                    F: 'dddd, MMMM dd, yyyy h:mm:ss tt',
                    // month/day pattern
                    M: 'MMMM dd',
                    // month/year pattern
                    Y: 'yyyy MMMM',
                    // S is a sortable format that does not vary by culture
                    S: 'yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss',
                    // formatting of dates in MySQL DataBases
                    ISO: 'yyyy-MM-dd hh:mm:ss',
                    ISO2: 'yyyy-MM-dd HH:mm:ss',
                    d1: 'dd.MM.yyyy',
                    d2: 'dd-MM-yyyy',
                    d3: 'dd-MMMM-yyyy',
                    d4: 'dd-MM-yy',
                    d5: 'H:mm',
                    d6: 'HH:mm',
                    d7: 'HH:mm tt',
                    d8: 'dd/MMMM/yyyy',
                    d9: 'MMMM-dd',
                    d10: 'MM-dd',
                    d11: 'MM-dd-yyyy'
                },
                percentsymbol: typeof settings['percentsymbol'] === 'undefined' ? '%' : settings['percentsymbol'],
                currencysymbol: typeof settings['currencysymbol'] === 'undefined' ? '₺' : settings['currencysymbol'],
                currencysymbolposition: 'before',
                decimalseparator: typeof settings['decimalseparator'] === 'undefined' ? ',' : settings['decimalseparator'],
                thousandsseparator: typeof settings['thousandsseparator'] === 'undefined' ? '.' : settings['thousandsseparator'],
                pagergotopagestring: 'Sayfaya Git:',
                pagershowrowsstring: 'Satırları Göster:',
                pagerrangestring: ' / ',
                pagerpreviousbuttonstring: 'önceki',
                pagernextbuttonstring: 'sonraki',
                pagerfirstbuttonstring: 'ilk',
                pagerlastbuttonstring: 'son',
                groupsheaderstring: 'Drag a column and drop it here to group by that column',
                sortascendingstring: 'Sort Ascending',
                sortdescendingstring: 'Sort Descending',
                sortremovestring: 'Remove Sort',
                groupbystring: 'Group By this column',
                groupremovestring: 'Remove from groups',
                filterclearstring: 'Clear',
                filterstring: 'Filter',
                filtershowrowstring: 'Show rows where:',
                filterorconditionstring: 'Or',
                filterandconditionstring: 'And',
                filterselectallstring: '(Select All)',
                filterchoosestring: 'Lütfen Seçiniz:',
                filterstringcomparisonoperators: ['empty', 'not empty', 'enthalten', 'enthalten(match case)',
                    'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
                    'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterbooleancomparisonoperators: ['equal', 'not equal'],
                validationstring: 'Entered value is not valid',
                emptydatastring: 'Gösterilecek veri bulunmamaktadır.',
                filterselectstring: 'Select Filter',
                loadtext: 'Yükleniyor...',
                clearstring: 'Temizle',
                todaystring: 'Bugün',
                addrowstring: 'Ekle',
                resetrowstring: 'Reset',
                everpresentrowplaceholder: ' '
            };
            break;
    }
    return localization;
};
