
var EditQuestionTable = {
    End_Batch_EditQuestionTable: true,
    Start_Batch_EditQuestionTable: true,
    Current_Page_EditQuestionTable: true,
    Records_Per_Page_EditQuestionTable: true,
    Total_Records_EditQuestionTable: true,
    Total_Pages_EditQuestionTable: true,
    Go_to_Page_EditQuestionTable: true,
    Page_Bar_EditQuestionTable: true,
    isEditable: true,
    containerJID: '#pager_EditQuestionTable',
    totalRecordsJID: '#totalRecords_EditQuestionTable',
    totalPagesJID: '#totalPages_EditQuestionTable',
    RecordsPerPageJID: '#RecordsPerPage_EditQuestionTable',
    CurrentPageJID: '#CurrentPage_EditQuestionTable',
    GoToPageJID: '#GoToPage_EditQuestionTable',
    itemsJID: '#items_EditQuestionTable',
    TableContJID: '#TableCont_EditQuestionTable',
    pitem: 'pitem_EditQuestionTable',
    actualobjectName: 'EditQuestionTable.theUsageTable',
    headerMapping: {
        "sno": "S.No",
        "question": "Question"
    },
    deleteCallback: (row, jData) => {
        EditQuestionTable.currentRow = row; //store this row object for future use
        alert('About to delete\n' + JSON.stringify(jData, null, ' '));
        EditQuestionTable.theUsageTable.remove_row(EditQuestionTable.currentRow);
        //make Ajax call and get the jData deleted at the Back end/ DB
        //$.ajax({ url: "back end url to delete jData from DB", data: { toDel: JSON.stringify(jData) } }).done((jRespData) => {
        //            EditQuestionTable.theUsageTable.remove_row(EditQuestionTable.currentRow);
        //        }).catch(jCatch => jCatch);
    },
    editCallback: (row, jData) => {
        EditQuestionTable.currentObject_1 = jData;
        EditQuestionTable.currentRow = row;//store this row object for future use
        for (let k in EditQuestionTable.headerMapping) $("#" + k + '_EditQuestionTable').val(jData[k]);
        if (!EditQuestionTable.myModal) EditQuestionTable.myModal = new bootstrap.Modal(document.getElementById('pager_edit_EditQuestionTable'))
        EditQuestionTable.myModal.toggle();
        //After jData gets Edited you can do the following
        //EditQuestionTable.theUsageTable.edit_row(this.currentRow, this.currentObject_1);
    },
    save_click: function (e) {
        var theObj = {};
        for (let k in EditQuestionTable.headerMapping) theObj[k] = $("#" + k + '_EditQuestionTable').val();
        alert("Send this object to back end for editing\nUpon success make the following call :\nEditQuestionTable.theUsageTable.edit_row(EditQuestionTable.currentRow, theObj)" + JSON.stringify(theObj, null, ' '));
        EditQuestionTable.theUsageTable.edit_row(EditQuestionTable.currentRow, theObj);
        //$.ajax({ url: config.contextPath + "Home/editobject?theObj="_OBJ_ }).done((jRespData) => {
        //    //jData.Name = "Labamba_" + jData.Name.split('_')[1] ;
        //    TheTopTable.theTable.edit_row(this.currentRow, this.currentObject_1);
        //    //this.myModal.toggle();
        //});
    },
    sortCallBack: (e, byWhat, direction) => {
        alert("In Sort Callback \nbyWhat = " + byWhat + "\ndir = " + direction + "\nOffset = " + EditQuestionTable.theUsageTable.offset + "\nLimit = " + EditQuestionTable.theUsageTable.itemsPerPage);
        EditQuestionTable.theUsageTable.start_action();
    },
    getTable: (offset, limit) => {
        //make an AJAX call and return the ajax response as a promise
        var url = EditQuestionTable.getPageDataURL;
        url = url.replace('_OFFSET_', offset).replace('_LIMIT_', limit);
        return $.ajax({ url: url, context: this });
    },
    GetRecordCount: () => {
        return $.ajax({ url: EditQuestionTable.TotRecURL, context: this }).then(jData => parseInt(jData));
    },
    start_action: function (data, tag) {
        new TemplateRenderer(data, tag, "~/wwwroot/Scripts/Components/EditQuestion/EditQuestion.html").start_action().
            then(async jData =>  {
                let user_name = await $.ajax({ url: config.contextPath + "Home/GetUserName" });
                if (!user_name) {
                    LogIn.ShowLoginDialog();
                    return;
                }
                alert(user_name);
                if (!EditQuestionTable.theUsageTable) EditQuestionTable.theUsageTable = new Pest(EditQuestionTable, "EditQuestionTable.theUsageTable");
                EditQuestionTable.theUsageTable.start_action();
            })
    },
    theUsageTable: null,
    TotRecURL: "/VnVOverflow/" + 'Home/GetCountOfQuestions',
    getPageDataURL: "/VnVOverflow/" + "Home/GetNextSet?offset=_OFFSET_&limit=_LIMIT_&orderby=id",
}
            //*****************EditQuestionTable.start_action(); *********************