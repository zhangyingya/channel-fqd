(function($) {
    $.convert = function (str) {
    	return funcMoney2Letters(str);
    }
    
    function funcMoney2Letters(str) {
    	var iNum = Math.round(parseFloat(str * 100)) / 100;
    	if (!iNum) {
    		return;
    	}
    	var arrPlace = new Array('', ' Thousand ', ' Million ', ' Billion ',
    			' Trillion ', ' Quadrillion ', ' Quintillion ', ' Sextillion ',
    			' Septillion ', ' Octillion ', ' Nonillion ', ' Decillion ',
    			' Undecillion ', ' Duodecillion ');
    	var strNum = iNum + "";
    	var strInt = strNum;// 整数部分
    	var idxPoint = strNum.indexOf('.');
    	var Cents = "";
    	if (idxPoint > 0) {// 小数部分
    		var strCents = strNum.substring(idxPoint + 1);
    		if (strCents.length == 1)
    			strCents += "0";
    		Cents = funcConvertTens(strCents);
    		strInt = strInt.substring(0, idxPoint);// 整数部分
    	}
    	var iCount = 0;
    	var Dollars = "";
    	while (strInt != "") {
    		var Temp = funcConvertHundreds(strInt.substring(strInt.length - 3));
    		if (Temp != "")
    			Dollars = Temp + arrPlace[iCount] + Dollars;
    		if (Temp.length > 3) {
    			strInt = strInt.substring(0, strInt.length - 3);
    		} else {
    			strInt = "";
    		}
    		iCount++;
    		if (iCount >= arrPlace.length)
    			break;// 数值太大无法处理
    	}

    	var res = "";
    	if (Dollars == "One") {
    		res = Dollars + " Dollar";
    	} else if (Dollars != "") {
    		res = Dollars + " Dollars";
    	}
    	if (Cents != "" && Dollars != "")
    		res += " AND"
    	if (Cents == "") {
    		res += " Only";
    	} else if (Cents == "One") {
    		res += " One Cent";
    	} else {
    		res += " " + Cents + " Cents";
    	}
    	return res;
    }
	// 处理十位数
    function funcConvertTens(v) {
    	var vLeft = parseInt(v.substring(0, 1));
    	var vRight = parseInt(v.substring(1));
    	var res = "";
    	if (vLeft == 1) {
    		switch (vRight) {
    		case 0:
    			res = "Ten";
    			break;
    		case 1:
    			res = "Eleven";
    			break;
    		case 2:
    			res = "Twelve";
    			break;
    		case 3:
    			res = "Thirteen";
    			break;
    		case 4:
    			res = "Fourteen";
    			break;
    		case 5:
    			res = "Fifteen";
    			break;
    		case 6:
    			res = "Sixteen";
    			break;
    		case 7:
    			res = "Seventeen";
    			break;
    		case 8:
    			res = "Eighteen";
    			break;
    		case 9:
    			res = "Nineteen";
    			break;
    		}
    	} else if (vLeft > 1) {
    		switch (vLeft) {
    		case 2:
    			res = "Twenty";
    			break;
    		case 3:
    			res = "Thirty";
    			break;
    		case 4:
    			res = "Forty";
    			break;
    		case 5:
    			res = "Fifty";
    			break;
    		case 6:
    			res = "Sixty";
    			break;
    		case 7:
    			res = "Seventy";
    			break;
    		case 8:
    			res = "Eighty";
    			break;
    		case 9:
    			res = "Ninety";
    			break;
    		}
    	}
    	if (vLeft == 0) {
    		res = funcConvertDigit(vRight);
    	} else if (vLeft > 1 && vRight > 0) {
    		res += "-" + funcConvertDigit(vRight)
    	}
    	return res;
    }
    // 处理个位数
    function funcConvertDigit(v) {
    	var res = "";
    	switch (v) {
    	case 1:
    		res = "One";
    		break;
    	case 2:
    		res = "Tow";
    		break;
    	case 3:
    		res = "Three";
    		break;
    	case 4:
    		res = "Four";
    		break;
    	case 5:
    		res = "Five";
    		break;
    	case 6:
    		res = "Six";
    		break;
    	case 7:
    		res = "Seven";
    		break;
    	case 8:
    		res = "Eight";
    		break;
    	case 9:
    		res = "Nine";
    		break;
    	}
    	return res;
    }
    // 处理百位数
    function funcConvertHundreds(v) {
    	var res = "";
    	var vVal = parseInt(v);
    	if (vVal == 0)
    		return res;
    	v = "000" + v;
    	v = v.substring(v.length - 3)
    	vRight = parseInt(v.substr(2, 1));
    	vLeft = parseInt(v.substr(0, 1));
    	vMid = parseInt(v.substr(1, 1));
    	if (vLeft > 0) {
    		if (vMid + vRight > 0) {
    			res = funcConvertDigit(vLeft) + " Hundred and ";
    		} else {
    			res = funcConvertDigit(vLeft) + " Hundred ";
    		}
    	}
    	if (vMid > 0) {
    		res += funcConvertTens(vMid + "" + vRight);
    	} else {
    		res += funcConvertDigit(vRight);
    	}
    	return res;
    }
})(jQuery);