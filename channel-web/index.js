// ��ת��¼ҳ
$.ajaxSetup({  
    //����ajax���������ִ�ж���  
    complete : function(XMLHttpRequest, textStatus) {
    try{
     	var resText = XMLHttpRequest.responseText;  
     	if(resText.indexOf("cas-login") != -1) {
     		window.location.href="http://192.1.17.36:2010/sso";
     		return;
     	}
    	var obj=$.parseJSON(resText);
        if(obj && obj.flag=='FAIL' && obj.exceptionHandler=='1'){
        	alert('error', obj.msg);
        }
     }catch(e){
     }
   }  
});


function test() {
	$.ajax({
   	    type: "post", 
   	 	async:true,
   	    url: 'http://192.1.17.36:2010/esmp-serve-rest/test.do',
   	    data: {}, 
   	    dataType: "json",
   	    success: function(data){ 
   	    	if(data.flag=="SUCCESS"){
   	    		alert(data.msg);
			}else{
				alert(data.msg);
			}
   	    },
   	    error: function(msg){ 
   	    	console.log(msg);
	    }
   });

}

