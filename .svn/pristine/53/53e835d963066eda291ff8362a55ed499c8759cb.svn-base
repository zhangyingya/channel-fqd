/*
 * Copyright © 2016，the original authors or Tianyuan DIC Computer Co., Ltd.
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
 * Tel: +86 17355100932 
 */
package com.tydic.common.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.zip.CRC32;

/**
 *	//TODO
 *
 * @author fubin {@link fubin@tydic.com} 
 * @version  fp 下午5:14:03
 * @since 1.0
 **/
public class ObjectUtil {

	public static Object ByteToObject(byte[] bytes)
	{
		Object obj=null;
		ByteArrayInputStream bi=null;
		ObjectInputStream oi=null;
		if(bytes ==null || bytes.length ==0)
		{
			return obj;
		}
		try
		{
			// bytearray to object
			bi = new ByteArrayInputStream(bytes);
			oi = new ObjectInputStream(bi);
			obj = oi.readObject();
		}
		catch (Exception e)
		{
			throw new RuntimeException(e.getMessage(),e);
		}
		finally
		{
			try
			{
				if(bi != null)
				{
					bi.close();
				}
				if(oi != null)
				{
					oi.close();
				}
			}catch (Exception e)
			{}
		}
		return obj;
	}

	public static byte[] ObjectToByte(Object obj)
	{
		byte[] bytes=null;
		ByteArrayOutputStream bo=null;
		ObjectOutputStream oo=null;
		if(obj==null)
		{
			return bytes;
		}
		try
		{
			// object to bytearray
			bo = new ByteArrayOutputStream();
			oo = new ObjectOutputStream(bo);
			oo.writeObject(obj);

			bytes = bo.toByteArray();
		}
		catch (Exception e)
		{
			throw new RuntimeException(e.getMessage(),e);
		}
		finally
		{
			try
			{
				if(bo != null)
				{
					bo.close();
				}
				if(oo != null)
				{
					oo.close();
				}
			}catch (Exception e)
			{}
		}
		return bytes;
	}
	
	public static Long getLongValue(String key)
	{
		if(key==null)
		{
			return null;
			//throw new RuntimeException("KEY不能为空");
		}
		CRC32 crc32 = new CRC32();
		crc32.update(key.getBytes());
		return crc32.getValue();
	}
	
	public static String overlay(String str,String replaceStr,int start,int end)
	{
		String oldStr=str.substring(start, end);
		return str.replace(oldStr, replaceStr);
	}
	
}
