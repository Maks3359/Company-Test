$(document).ready(function () {
    function MakeQuery() {
        var AndVal = '';
        var ORVal = '';
        var NOTEqualVal = '';

        try { AndVal = document.getElementById("Search_ANDRB").checked; } catch (ex) { }
        try { ORVal = document.getElementById("Search_ORRB").checked; } catch (ex) { }
        try { NOTEqualVal = document.getElementById("Search_NOTEqualCB").checked; } catch (ex) { }

        var currentselection = ''; var currentselectiondaterange = ''; var currentsearch = ''; var currentvalue = ''; var currentrange1 = ''; var currentrange2 = ''
        try { currentselection = $('#Search_dpField option:selected').val().trim(); } catch (ex) { }

        var currentFilter = '';
        try { currentFilter = $('#Search_txtQry').val(); } catch (ex) { }

        if (currentselection.toString().length != 0) {
            switch (currentselection) {
                case "PROJECT NUMBER":
                case "PROJECT NAME":
                case "CLIENT":
                case "LOCATION":
                case "ARCHITECT":
                case "CONTRACTOR":
                case "ISSUED BY":
                    try { currentvalue = $('#Search_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }
                    break;
                case "ISSUED DATE":
                    try { currentvalue = $('#Search_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }
                    break;
            }


            if (currentselection.toString().length != 0 && currentselection == "") {

            }
            else if (currentselection.toString().length != 0 && currentselection == "Type") {
                try {
                    currentselection = "TypeDescription";
                    try { currentvalue = $('#MainContent_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }
                } catch (ex) { }
            }
            else if (currentselection.toString().length != 0 && currentselection == "Material Description") {
                try {
                    currentselection = "MaterialDescription";
                    try { currentvalue = $('#MainContent_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }

                } catch (ex) { }
            }
            else if (currentselection.toString().length != 0 && currentselection == "Supplier") {
                try {
                    currentselection = "SupplierName";
                    try { currentvalue = $('#MainContent_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "%'" } catch (ex) { }

                } catch (ex) { }
            }
            else if (currentselection.toString().length != 0 && currentselection == "Approved") {
                try {
                    currentselection = "IsApproved";
                    try { currentvalue = $('#MainContent_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }

                } catch (ex) { }
            }
            else if (currentselection.toString().length != 0 && (currentselection == "Material Description" || currentselection == "PMLRefNo" || currentselection == "Client" || currentselection == "Project" || currentselection == "Location" || currentselection == "SampleLocation")) {
                try { currentvalue = $('#MainContent_txtValue').val(); currentvalue = "'" + currentvalue.trim() + "'" } catch (ex) { }

            }
            else if (currentselection == "Status") {
                currentselection = "SampleStatus";
                try {
                    currentvalue = $('#MainContent_dpSearchStatus option:selected').text(); currentvalue = "'" + currentvalue.trim() + "'"
                } catch (ex) { }
            }
            else if (currentselection == "Date Sampled") {
                try { currentrange1 = $('#MainContent_txtRange1').val(); } catch (ex) { }
                try { currentrange2 = $('#MainContent_txtRange2').val(); } catch (ex) { }
                currentselectiondaterange = " ( DateSampled >=" + "'" + currentrange1 + "'" + " and DateSampled <=" + "'" + currentrange2 + "' ) ";
            }
            else if (currentselection == "Date Received") {
                try { currentrange1 = $('#MainContent_txtRange1').val(); } catch (ex) { }
                try { currentrange2 = $('#MainContent_txtRange2').val(); } catch (ex) { }
                currentselectiondaterange = " ( DateReceived >=" + "'" + currentrange1 + "'" + " and DateReceived <=" + "'" + currentrange2 + "' ) ";
            }
            else if (currentselection == "Date Completed") {
                try { currentrange1 = $('#MainContent_txtRange1').val(); } catch (ex) { }
                try { currentrange2 = $('#MainContent_txtRange2').val(); } catch (ex) { }
                currentselectiondaterange = " ( DateCompleted >=" + "'" + currentrange1 + "'" + " and DateCompleted  <=" + "'" + currentrange2 + "' ) ";
            }
        }




        var ConditionOperater = ' and ';
        var EqualOperater = ' = ';
        if (NOTEqualVal == true && currentselection == "SupplierName") {
            EqualOperater = ' NOT like ';
        }
        else if (NOTEqualVal == false && currentselection == "SupplierName") {
            EqualOperater = ' like ';
        }
        else if (NOTEqualVal == true && currentselection != "SupplierName") {
            EqualOperater = ' != ';
        }
        else {
            EqualOperater = ' = ';
        }

        if (ORVal == true) {
            ConditionOperater = ' or ';
        }
        else {
            ConditionOperater = ' and ';
        }

        if (currentFilter.toString().length == 0) {
            if (currentselection == "Date Sampled" || currentselection == "Date Received" || currentselection == "Date Completed") {
                currentsearch = 'Where ' + currentselectiondaterange;
                $('#MainContent_txtMulti').val(currentsearch);
            }
            else {
                currentsearch = 'Where ' + currentselection + ' ' + EqualOperater + ' ' + currentvalue;
                $('#MainContent_txtMulti').val(currentsearch);
            }
        }
        else {
            if (currentselection == "Date Sampled" || currentselection == "Date Received" || currentselection == "Date Completed") {
                currentsearch = currentFilter + ' and ' + currentselectiondaterange;
                $('#MainContent_txtMulti').val(currentsearch);
            }
            else {
                currentsearch = currentFilter + ' ' + ConditionOperater + ' ' + currentselection + ' ' + EqualOperater + ' ' + currentvalue;
                $('#MainContent_txtMulti').val(currentsearch);
            }
        }

        ResettxtMultiAndHQ(currentsearch);
    }

});