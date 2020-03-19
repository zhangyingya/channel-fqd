package com.tydic.common.calendar;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarUtil {
	
	public enum CalendarType{solar,lunar}
	
	public enum Week{
		monday(0,"周一"),tuesday(1,"周二"),wednesday(2,"周三"),
		thursday(3,"周四"),friday(4,"周五"),saturday(5,"周六"),sunday(6,"周日");

		private String cnName;
		private int value;
		
		private Week(int value,String cnName){
			this.value=value;
			this.cnName=cnName;
		}

		public String getCnName() {
			return cnName;
		}
		public int getValue() {
			return value;
		}
	}
	
	public enum Holidays{
		newYearsDay("元旦节"),chineseNewYear("春节"),qingMing("清明节"),
		mayDay("五一劳动节"),dragonBoat("端午节"),midAutumn("中秋节"),nationalDay("国庆节");
		
		private String cnName;
		
		private Holidays(String cnName){
			this.cnName=cnName;
		}
		
		public String getCnName(){
			return cnName;
		}
	}

	public static Week getWeek(Date d) {
		Week[] weekDays = {Week.sunday, Week.monday, Week.tuesday, 
        		Week.wednesday, Week.thursday, Week.friday, Week.saturday};
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);

        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }

        return weekDays[w];
    }
	
	/**
	 * 获取某年的清明节
	 * @param year
	 * @return
	 */
	public static int qingMing(int year) {  
	    if (year == 2232) {  
	        return 4;
	    } 
	    
	    if (year < 1700 || year >= 3100) {  
	        throw new RuntimeException("1700年以前和3100年以后暂时不支持");  
	    }  
	    double[] coefficient = {5.15, 5.37, 5.59, 4.82, 5.02, 5.26, 5.48, 4.70, 4.92, 5.135, 5.36, 4.60, 4.81, 5.04, 5.26};  
	    int mod = year % 100;
	    return (int) (mod * 0.2422 + coefficient[year / 100 - 17] - mod / 4);
	}
	
	/**
	 * 判断给定的日期是否为法定节假日当天，是返回节假日实体，不是返回null
	 * @param d
	 * @return
	 */
	public static Holidays holidays(Date d){
		Calendar cal = Calendar.getInstance();
        cal.setTime(d);
        
        LunarCalendar lunarCal=new LunarCalendar(cal);
        
        if(cal.get(Calendar.MONTH)==0 && cal.get(Calendar.DAY_OF_MONTH)==1){ //元旦
        	return Holidays.newYearsDay;
        }
        
        if(lunarCal.getMonth()==1 && lunarCal.getDay()==1){ //春节
        	return Holidays.chineseNewYear;
        }
        
        if(cal.get(Calendar.MONTH)==3 && qingMing(cal.get(Calendar.YEAR))==cal.get(Calendar.DAY_OF_MONTH)){ //清明
        	return Holidays.qingMing;
        }
        
        if(cal.get(Calendar.MONTH)==4 && cal.get(Calendar.DAY_OF_MONTH)==1){ //五一劳动节
        	return Holidays.mayDay;
        }
        
        if(lunarCal.getMonth()==5 && lunarCal.getDay()==5){ //端午节
        	return Holidays.dragonBoat;
        }
        
        if(lunarCal.getMonth()==8 && lunarCal.getDay()==15){ //中秋节
        	return Holidays.midAutumn;
        }
        
        if(cal.get(Calendar.MONTH)==9 && cal.get(Calendar.DAY_OF_MONTH)==1){ //国庆节
        	return Holidays.nationalDay;
        }
		
		return null;
	}
	
	public static DayInfo[][] daysOfMonth(int year,int month){
		Calendar cal=Calendar.getInstance();
		String dateStr=year+(month>9 ? String.valueOf(month) : ("0"+month))+"01";
		try {
			cal.setTime(new SimpleDateFormat("yyyyMMdd").parse(dateStr));
		} catch (ParseException e) {
			throw new RuntimeException(e.getMessage(),e);
		}
		
		DayInfo[][] days=new DayInfo[6][7];
		
		int rowNo=0;
		while(cal.get(Calendar.MONTH)==(month-1)){
			Week week=getWeek(cal.getTime());
			LunarCalendar lunarCal=new LunarCalendar(cal);
			
			DayInfo dayInfo=new DayInfo();
			dayInfo.setDate(cal.getTime());
			dayInfo.setYear(cal.get(Calendar.YEAR));
			dayInfo.setMonth(cal.get(Calendar.MONTH)+1);
			dayInfo.setDay(cal.get(Calendar.DAY_OF_MONTH));
			dayInfo.setHolidays(holidays(cal.getTime()));
			dayInfo.setLunarMonthDayString(lunarCal.getChinaMonthString()+lunarCal.getChinaDayString());
			dayInfo.setWeek(week);
			days[rowNo][week.value]=dayInfo;
			
			if(week.value==6){
				rowNo++;
			}
			
			cal.add(Calendar.DAY_OF_MONTH, 1);
		}
		
		return days;
	}
	
	public static void main(String[] args) throws ParseException {
	}
	
}
