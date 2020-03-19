/*
 * Copyright © 2015，the original authors or Tianyuan DIC Computer Co., Ltd.
 *
 * Please see the tydic success stories and it solutions 
 *
 *      http://www.tydic.com/Default.aspx
 *
 * Statement: This document's code after sufficiently has not permitted does not have 
 * any way dissemination and the change, once discovered violates the stipulation, will
 * receive the criminal sanction.
 * Address: 3/F,T3 Building, South 7th Road, South Area, Hi-tech Industrial park, Shenzhen, P.R.C.
 * Email: fubin@tydic.com　
 * Tel: +86 755 26745688 
 */
package com.tydic.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 时期处理工具
 * @author fubin {@link fubin@tydic.com} 
 * @version  lpht 上午10:09:38
 * @since 1.0
 **/
public class DateUtil {
	
	private DateUtil() {

	}

	// 初始化日志
	private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);

	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static final String DATE_PATTERN_M = "yyyy-MM-dd HH:mm:ss";

	/**
	 * dd/MM/yyyy HH:mm:ss
	 */
	public static final String DATE_PATTERN_N = "dd/MM/yyyy HH:mm:ss";

	/**
	 * yyyy-MM-dd
	 */
	public static final String DATE_PATTERN_D = "yyyy-MM-dd";
	
	/**
	 * MM
	 */
	public static final String DATE_PATTERN_MONTH = "MM";
	
	/**
	 * dd
	 */
	public static final String DATE_PATTERN_DAY = "dd";

	public static Date format(String dateStr) {
		Date date = null;
		if (dateStr == null || "".equals(dateStr.trim())) {
			return date;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN_D);

		try {
			date = sdf.parse(dateStr);
		} catch (ParseException e) {
			logger.debug("日期格式不正确 yyyy-MM-dd", e);
		}
		return date;
	}

	/**
	 * 将date字符串转化成指定pattern的Date时间 默认为yyyy-MM-dd HH:mm:ss
	 * 
	 * @param dateStr
	 * @param pattern
	 * @return
	 */
	public static Date format(String dateStr, String pattern) {
		Date date = null;
		SimpleDateFormat sdf = null;
		if (dateStr == null || "".equals(dateStr.trim())) {
			return date;
		}
		if (null != pattern && !pattern.equals("")) {
			sdf = new SimpleDateFormat(pattern);
		} else {
			sdf = new SimpleDateFormat(DATE_PATTERN_D);
		}

		try {
			date = sdf.parse(dateStr);
		} catch (ParseException e) {
			logger.debug("日期格式不正确 yyyy-MM-dd", e);
		}
		return date;
	}

	/**
	 * 将date字符串转化成指定targetPattern的Date时间字符串 默认为yyyy-MM-dd HH:mm:ss
	 * 
	 * @param dateStr
	 * @param pattern
	 * @return
	 */
	public static String format(String dateStr, String srcPattern,
			String targetPattern) {
		Date date = null;
		SimpleDateFormat sdf = null;
		if (dateStr == null || "".equals(dateStr.trim())) {
			return "";
		}
		if (null != srcPattern && !srcPattern.equals("")) {
			sdf = new SimpleDateFormat(srcPattern);
		} else {
			sdf = new SimpleDateFormat(DATE_PATTERN_D);
		}

		try {
			date = sdf.parse(dateStr);
		} catch (ParseException e) {
			logger.debug("日期格式不正确 yyyy-MM-dd", e);
			date = null;
		}
		return format(date, targetPattern);
	}

	public static String format(Date date) {
		String dateStr = null;
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN_M);
		dateStr = sdf.format(date);
		return dateStr;
	}
	
	/**
	 * 获取当前月份
	 * @param date
	 * @return  String
	 */
	public static String formatMM(Date date) {
		String dateStr = null;
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN_MONTH);
		dateStr = sdf.format(date);
		return dateStr;
	}
	
	/**
	 * 获取当前日
	 * @param date
	 * @return  String
	 */
	public static String formatDD(Date date) {
		String dateStr = null;
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN_DAY);
		dateStr = sdf.format(date);
		return dateStr;
	}

	/**
	 * 根据日期模式，返回需要的日期对象
	 * 
	 * @param date
	 * @param pattern
	 * @return String
	 */
	public static String format(Date date, String pattern) {
		String dateStr = null;
		if (date == null) {
			return null;
		}
		pattern = ObjectIsNull.check(pattern) ?  DATE_PATTERN_D : pattern;
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		dateStr = sdf.format(date);
		return dateStr;
	}

	/**
	 * 日期加一天的方法
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOne(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1
		c.add(Calendar.DATE, 1);
		// 结果
		return c.getTime();
	}

	/**
	 * 当前时间增加小时数的方法
	 * 
	 * @param date
	 * @return
	 */
	public static Date getMoreHourTime(Integer hourNum) {
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(new Date());
		// 加小时数
		c.add(Calendar.HOUR, hourNum);
		// 结果
		return c.getTime();
	}

	/**
	 * 日期加一个月的方法
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonth(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1
		c.add(Calendar.MONTH, 1);
		// 结果
		// V2.8 将失效日期设为每月最后一天
		// add by lixg on 2010-09-10
		// 月份加1，得到下个月，
		c.add(Calendar.MONTH, 1);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		c.add(Calendar.DATE, -1);// 再减一天，得到上月最后一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后最后一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonth(Date date, int n) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1
		c.add(Calendar.MONTH, 1);
		// 结果
		// V2.8 将失效日期设为每月最后一天
		// add by lixg on 2010-09-10
		// 月份加1，得到下个月，
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		c.add(Calendar.DATE, -1);// 再减一天，得到上月最后一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后最后一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonth(String date, int n) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(format(date));
		// 日期加1
		c.add(Calendar.MONTH, 1);
		// 结果
		// V2.8 将失效日期设为每月最后一天
		// add by lixg on 2010-09-10
		// 月份加1，得到下个月，
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		c.add(Calendar.DATE, -1);// 再减一天，得到上月最后一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后最后一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonth(String date, int n, String formatStyle) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(format(date, formatStyle));
		// 日期加1
		c.add(Calendar.MONTH, 1);
		// 结果
		// V2.8 将失效日期设为每月最后一天
		// add by lixg on 2010-09-10
		// 月份加1，得到下个月，
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		c.add(Calendar.DATE, -1);// 再减一天，得到上月最后一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后第一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonthFirstDay(String date, int n) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(format(date));
		// 月份加n
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后第一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonthFirstDay(String date, int n,
			String formatStyle) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(format(date, formatStyle));
		// 月份加n
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		return c.getTime();
	}

	/**
	 * 日期加N个月的方法(n月后第一天)
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneMonthFirstDay(Date date, int n) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 月份加n
		c.add(Calendar.MONTH, n);
		c.set(Calendar.DATE, 1);// 将日期设为当月1号，得到当月第一天
		return c.getTime();
	}

	/**
	 * 取日期当月第一天
	 * 
	 * @author FANG_HONG_BIN
	 * @param date
	 * @return
	 */
	public static Date getCurrMonthBeginDate(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 取日期当月第一天
		c.set(Calendar.DAY_OF_MONTH, 1);
		// 结果
		return c.getTime();
	}

	/**
	 * 取日期下月第一天
	 * 
	 * @author FANG_HONG_BIN
	 * @param date
	 * @return
	 */
	public static Date getNextMonthBeginDate(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1月
		c.add(Calendar.MONTH, 1);
		// 取日期当月第一天
		c.set(Calendar.DAY_OF_MONTH, 1);
		// 结果
		return c.getTime();
	}

	/**
	 * 取日期当月最后一天
	 * 
	 * @author FANG_HONG_BIN
	 * @param date
	 * @return
	 */
	public static Date getCurrMonthEndDate(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 取日期当月第一天
		c.set(Calendar.DAY_OF_MONTH, 1);
		// 取日期当月最后一天
		c.roll(Calendar.DAY_OF_MONTH, -1);
		// 结果
		return c.getTime();
	}

	/**
	 * 日期减一个月的方法
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateCutOneMonth(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1
		c.add(Calendar.MONTH, -1);
		// 结果
		return c.getTime();
	}

	/**
	 * 日期加一年的方法
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddOneYear(Date date) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1年
		// c.add(Calendar.DATE , 1);
		c.add(Calendar.YEAR, 1);
		// 结果
		return c.getTime();
	}

	/**
	 * 获取n年后的年底
	 * 
	 * @param date
	 * @return
	 */
	public static Date getDateAddYearLast(Date date, int n) {
		if (date == null) {
			return null;
		}
		Calendar c = Calendar.getInstance();
		// 设置日期
		c.setTime(date);
		// 日期加1年
		// c.add(Calendar.DATE , 1);
		c.add(Calendar.YEAR, n);
		c.set(Calendar.MONTH, 11);
		c.set(Calendar.DATE, 31);
		// 结果
		return c.getTime();
	}

	/**
	 * 获取当前时间的字符串,格式为yyyy-MM-dd HH:mm:ss
	 * 
	 * @author FANG_HONG_BIN
	 * @return
	 */
	public static String getCurrTimeString() {
		return format(new Date(), DATE_PATTERN_M);
	}

	/**
	 * java.util.Date 转换成 java.sql.Date
	 * 
	 * @author FANG_HONG_BIN
	 * @param date
	 * @return
	 */
	public static java.sql.Date toSqlDate(java.util.Date date) {
		java.sql.Date sqlDate = null;
		if (date != null) {
			sqlDate = new java.sql.Date(date.getTime());
		}
		return sqlDate;
	}

	/**
	 * java.util.Date 转换成 java.sql.Date
	 * 
	 * @author FANG_HONG_BIN
	 * @param date
	 * @return
	 */
	public static java.sql.Timestamp toSqlTime(java.util.Date date) {
		java.sql.Timestamp sqlDate = null;
		if (date != null) {
			sqlDate = new java.sql.Timestamp(date.getTime());
		}
		return sqlDate;
	}
	/**
	 * 获取日期的年份
	 * 
	 * @param date
	 * @return
	 */
	public static int getDateYear(java.util.Date date) {
		if (date == null) {
			return 0;
		}
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.YEAR);
	}

	/**
	 * 获取某年第一天日期
	 * 
	 * @param year
	 *            年份
	 * @return
	 */
	public static Date getYearFirst(int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.clear();
		calendar.set(Calendar.YEAR, year);
		Date currYearFirst = calendar.getTime();
		return currYearFirst;
	}

	/**
	 * 获取某年最后一天日期
	 * 
	 * @param year
	 *            年份
	 * @return
	 */
	public static Date getYearLast(int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.clear();
		calendar.set(Calendar.YEAR, year);
		calendar.roll(Calendar.DAY_OF_YEAR, -1);
		Date currYearLast = calendar.getTime();
		return currYearLast;
	}

	/**
	 * 获取当年的第一天
	 * 
	 * @return
	 */
	public static Date getCurrYearFirst() {
		Calendar currCal = Calendar.getInstance();
		int currentYear = currCal.get(Calendar.YEAR);
		return getYearFirst(currentYear);
	}

	/**
	 * 获取当年的最后一天
	 * @return
	 */
	public static Date getCurrYearLast() {
		Calendar currCal = Calendar.getInstance();
		int currentYear = currCal.get(Calendar.YEAR);
		return getYearLast(currentYear);
	}

	
	/**
	 * 获取某一天  前amount天或者后amount天的日期 。
	 */
	public static Date getSomeDatesBeforeOrAfter(Date destDate ,  int amount) throws ParseException{
		Calendar currCal = Calendar.getInstance();
		currCal.setTime(destDate);
		currCal.add(Calendar.DATE, amount);
		
		return currCal.getTime();
	}
	
	private static SimpleDateFormat ymdSdf = new SimpleDateFormat(DATE_PATTERN_D);
	public static String getSomeDatesBeforeOrAfterFormatter(Date destDate ,  int amount) throws ParseException{
		return ymdSdf.format(getSomeDatesBeforeOrAfter(destDate, amount));
	}
	
	
	public static String getDayOfWeek(Date date) {
		String[] days = {"周 日","周一","周二","周三","周四","周五","周六"};
		Calendar currCal = Calendar.getInstance();
		currCal.setTime(date);
		return days[currCal.get(Calendar.DAY_OF_WEEK)-1];
	}
	
	public static void main(String[] args) {
		System.out.println(getDayOfWeek(new Date()));
	}
	
}
