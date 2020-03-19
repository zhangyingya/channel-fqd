package com.tydic.common.cache;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author sutc
 * @project json字符串
 * @company tydic 日志压缩工具类
 */

public final class CompressUtil {
	private static Logger logger = LoggerFactory.getLogger(CompressUtil.class);

	/**
	 * 压缩方法
	 */
	public static byte[] compress(Object json) {
		// 将dataset压缩,返回字节数组
		byte[] data = null;
		ByteArrayOutputStream baos = null;
		GZIPOutputStream gos = null;
		ObjectOutputStream oos = null;
		try {
			// 建立字节数组输出流
			baos = new ByteArrayOutputStream();
			// 建立gzip压缩输出流
			gos = new GZIPOutputStream(baos);
			// 建立对象序列化输出流
			oos = new ObjectOutputStream(baos);
			// 将对象写入流
			oos.writeObject(json);
			// 转换字节数组
			data = baos.toByteArray();
			baos.close();
		} catch (IOException e) {
			logger.error("******压缩日志数据报错：{}",e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if(oos != null) {
					oos.close();
				}
				if(gos != null) {
					gos.close();
				}
				if(baos != null) {
					baos.close();
				}
			} catch (IOException e2) {
				logger.error("******压缩日志数据报错：{}",e2.getMessage());
				e2.printStackTrace();
			}
		}

		return data;
	}

	/**
	 * 解压缩方法
	 */
	public static Object unCompress(byte[] data) {
		Object json = null;
		ByteArrayInputStream bais = null;
		GZIPInputStream gis = null;
		ObjectInputStream ois = null;
		try {
			bais = new ByteArrayInputStream(data);
			gis = new GZIPInputStream(bais);
			ois = new ObjectInputStream(bais);
			json = ois.readObject();
		} catch (Exception e) {
			logger.error("******压缩日志数据报错：{}",e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if(ois != null) {
					ois.close();
				}
				if(gis != null) {
					gis.close();
				}
				if(bais != null) {
					bais.close();
				}
			} catch (IOException e2) {
				logger.error("******压缩日志数据报错：{}",e2.getMessage());
				e2.printStackTrace();
			}

		}
		return json;

	}
	
	public static void main(String[] args) throws UnsupportedEncodingException{
		
		String msg = "kkjkjsdlkjflkalkjlksjdlkfjdlkjlksjdlkfjlkds";
		byte[] a = msg.getBytes();
		byte[] data = CompressUtil.compress(msg);
		//String tmp = data.toString();
		System.out.println(new String(a,"utf-8"));
		
		
		
	}
}
