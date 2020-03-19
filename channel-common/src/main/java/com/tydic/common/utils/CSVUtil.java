package com.tydic.common.utils;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import com.csvreader.CsvReader;
import com.csvreader.CsvWriter;

public class CSVUtil {
	
	/**
	 * 读取csv文件，csv格式：以‘,’号分隔，‘'’包围字段，‘\’作为转义字符
	 * @param csvFilePath
	 * @param charsetName
	 * @return
	 * @throws IOException
	 */
	public static List<String[]> read(String csvFilePath,String charsetName) throws IOException{
		List<String[]> records=new ArrayList<String[]>();
		InputStream in=null;
		CsvReader csvin=null;
		try {
			in = new FileInputStream(csvFilePath);
			csvin=new CsvReader(in, Charset.forName(charsetName));
			csvin.setDelimiter(',');
			csvin.setTextQualifier('\'');
			csvin.setEscapeMode(CsvReader.ESCAPE_MODE_BACKSLASH);
			
			while(csvin.readRecord()){
				records.add(csvin.getValues());
			}
			
		} catch (IOException e) {
			throw e;
		} finally{
			try {
				csvin.close();
			} catch (Exception e) {}
			try {
				in.close();
			} catch (IOException e) {}
		}
		return records;
	}
	
	public static List<String[]> read(InputStream in,String charsetName) throws IOException{
		List<String[]> records=new ArrayList<String[]>();
		CsvReader csvin=null;
		try {
			csvin=new CsvReader(in, Charset.forName(charsetName));
			csvin.setDelimiter(',');
			csvin.setTextQualifier('\'');
			csvin.setEscapeMode(CsvReader.ESCAPE_MODE_BACKSLASH);
			
			while(csvin.readRecord()){
				records.add(csvin.getValues());
			}
			
		} catch (IOException e) {
			throw e;
		} finally{
			try {
				csvin.close();
			} catch (Exception e) {}
		}
		return records;
	}
	
	/**
	 * 写入数据到csv，csv格式：以‘,’号分隔，‘'’包围字段，‘\’作为转义字符
	 * @param csvFilePath
	 * @param records
	 * @param charsetName
	 * @throws IOException
	 */
	public static void writer(String csvFilePath,List<String[]> records,String charsetName) throws IOException{
		OutputStream out=null;
		CsvWriter csvout=null;
		try {
			out=new FileOutputStream(csvFilePath);
			csvout=new CsvWriter(out, ',', Charset.forName(charsetName));
			csvout.setDelimiter(',');
			csvout.setTextQualifier('\'');
			csvout.setEscapeMode(CsvReader.ESCAPE_MODE_BACKSLASH);
			if(records!=null){
				for(String[] record : records){
					csvout.writeRecord(record);
				}
			}
		} catch (IOException e) {
			throw e;
		} finally{
			try {
				csvout.close();
			} catch (Exception e) {}
			try {
				out.close();
			} catch (IOException e) {}
		}
	}
	
	public static void writer(OutputStream out,List<String[]> records,String charsetName) throws IOException{
		CsvWriter csvout=null;
		try {
			csvout=new CsvWriter(out, ',', Charset.forName(charsetName));
			csvout.setDelimiter(',');
			csvout.setTextQualifier('\'');
			csvout.setEscapeMode(CsvReader.ESCAPE_MODE_BACKSLASH);
			if(records!=null){
				for(String[] record : records){
					csvout.writeRecord(record);
				}
			}
		} catch (IOException e) {
			throw e;
		} finally{
			try {
				csvout.close();
			} catch (Exception e) {}
		}
	}
	
}
