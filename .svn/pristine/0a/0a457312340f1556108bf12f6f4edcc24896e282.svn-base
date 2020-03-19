package com.tydic.common.calendar;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.calendar.CalendarUtil.Holidays;
import com.tydic.common.calendar.CalendarUtil.Week;

public class DayInfo {

	/**
	 * 日期
	 */
	private Date date;
	/**
	 * 年
	 */
	private int year;
	/**
	 * 月
	 */
	private int month;
	/**
	 * 日
	 */
	private int day;
	/**
	 * 周
	 */
	private Week week;
	/**
	 * 节假日
	 */
	private Holidays holidays;
	/**
	 * 农历月日 名
	 */
	private String lunarMonthDayString;
	
	public String getHolidaysName(){
		if(holidays==null){
			return null;
		}
		
		return holidays.getCnName();
	}
	
	public Date getDate() {
		return date;
	}
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public void setDate(Date date) {
		this.date = date;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getMonth() {
		return month;
	}
	public Holidays getHolidays() {
		return holidays;
	}
	public void setHolidays(Holidays holidays) {
		this.holidays = holidays;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getDay() {
		return day;
	}
	public void setDay(int day) {
		this.day = day;
	}
	public Week getWeek() {
		return week;
	}
	public void setWeek(Week week) {
		this.week = week;
	}
	public String getLunarMonthDayString() {
		return lunarMonthDayString;
	}
	public void setLunarMonthDayString(String lunarMonthDayString) {
		this.lunarMonthDayString = lunarMonthDayString;
	}
	
}
