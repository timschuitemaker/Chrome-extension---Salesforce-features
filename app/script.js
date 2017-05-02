$(document).ready(function() {
    var sfID = convertId(window.location.pathname.substring(1, 16));

    var t1 = '<div class="brandTertiaryBrd pbSubheader tertiaryPalette">\
                <h3>Additional information<span class="titleSeparatingColon">:</span></h3>\
              </div>';

    var t2 = '<div class="pbSubsection">\
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">\
                    <tbody>\
                        <tr>\
                            <td class="last labelCol">ID 18 chars</td>\
                            <td class="dataCol last col02" id="18char">' + sfID + '</td>\
                            <td>&nbsp;</td>\
                            <td>&nbsp;</td>\
                        </tr>\
                    </tbody>\
                </table>\
               </div>'; 

    $(".bDetailBlock .pbBody").append(t1 + t2);


    createLookupLinks();
    $(".goToLink").click(function() {
        fieldId = $(this).siblings("input").attr('id');
        fieldValue = $("#" + fieldId + "_lkid").val();
        if (fieldValue != '000000000000000') {
            window.open("/" + fieldValue, '_blank');
        }
    });
});

//http://salesforce.stackexchange.com/questions/27686/how-can-i-convert-a-15-char-id-value-into-an-18-char-id-value
function convertId(id) {
    var i, j, flags, alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345";
    if (id === null) return id;
    id = id.replace(/\W/g, "");
    if (id.length != 15) {
        return id;
    }

    for (i = 0; i < 3; i++) {
        flags = 0;
        for (j = 0; j < 5; j++) {
            if (isUppercase(id.charAt(i * 5 + j))) { flags += 1 << j; }
        }
        id += alphabet.charAt(flags);
    }
    return id;
}

function isUppercase(c) {
    return c >= "A" && c <= "Z";
};

function createLookupLinks() {
    //console.log(chrome.extension.getURL('assets/images/icon.png'));
    $(".lookupInput").each(function(index, value) {
        $(this).append('<a href="javascript:return false;" class="goToLink">⇨</a>');
    });
}
