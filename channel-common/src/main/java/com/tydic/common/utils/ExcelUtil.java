package com.tydic.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tydic.common.annotation.Column;

/**
 * @ClassName: ExcelUtil 
 * @Description: Excel操作工具类
 * @author jiwei
 * @date 2016年8月24日 下午5:00:48 
 *
 */
public class ExcelUtil {
	/**
	 * @Title: readAsList 
	 * @Description: 读取excel内容
	 * @param file excel文件
	 * @param clazz 读取类
	 * @param sheetNo 页码 从0开始
	 * @param beginRow 读取开始行 从0开始
	 * @return
	 * @throws Exception 
	 */
	public static <T> List<T> readAsList(File file,Class<T> clazz,int sheetNo,int beginRow)throws Exception {
		List<T> datas=new ArrayList<T>();
		InputStream in=null;
		try {
			in=new FileInputStream(file);
			
			datas=readAsList(in,file.getName(), clazz, sheetNo, beginRow);
		} catch (FileNotFoundException e) {
			throw e;
		} finally{
			try {
				if(in!=null){
					in.close();
				}
			} catch (Exception e) {
			}
		}
		
		return datas;
	}
	
	/**
	 * @Title: readAsList 
	 * @Description: 读取excel内容
	 * @param in 输入流
	 * @param fileName 文件名
	 * @param clazz 读取类
	 * @param sheetNo 页码 从0开始
	 * @param beginRow 读取开始行 从0开始
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "deprecation", "resource" })
	public static <T> List<T> readAsList(InputStream in,String fileName,Class<T> clazz,int sheetNo,int beginRow) throws Exception{
		if(!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls")){
			throw new RuntimeException("文件类型错误!");
		}
		
		List<T> datas=new ArrayList<T>();
		SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat DateFormat_1 = new SimpleDateFormat("yyyy/MM/dd");
		SimpleDateFormat DateAndTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		Workbook wb = null;
		
		try {
	        if(fileName.endsWith(".xlsx")){
	        	wb = new XSSFWorkbook(in);
	        }else{
	        	wb = new HSSFWorkbook(new POIFSFileSystem(in));
	        }
		} catch (IOException e) {
	        throw e;
        }
		
		Sheet sheet=wb.getSheetAt(sheetNo);
			
		//总行数
		int rowNums=sheet.getLastRowNum();
		
		Row row=null;
		for(int i=beginRow;i<=rowNums;i++){
			row=sheet.getRow(i);
			
			Method[] methods=clazz.getMethods();
			
			T obj=clazz.newInstance();
			for(Method method : methods){
				//方法所有参数
				Class<?>[] argClazzs=method.getParameterTypes();
				
				if(!method.getName().startsWith("set") || 
						argClazzs.length!=1 ||
						!method.isAnnotationPresent(Column.class)){
					continue;
				}
				
				//方法参数
				Class<?> argClazz=argClazzs[0];
				
				Column exCol=method.getAnnotation(Column.class);
				//列号
				int colIndex=exCol.value();
				
				//单元格
				Cell cell=row.getCell(colIndex);
				
				if(cell==null){
					continue;
				}
				
				//整形
				if(argClazz==Integer.class || argClazz==int.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, (int)cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, Integer.valueOf(cell.getStringCellValue()));
						break;
					}
				}else if(argClazz==Long.class || argClazz==long.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, (long)cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, Long.valueOf(cell.getStringCellValue()));
						break;
					}
				}else if(argClazz==Short.class || argClazz==short.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, (int)cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, Short.valueOf(cell.getStringCellValue()));
						break;
					}
				}else if(argClazz==Double.class || argClazz==double.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, Double.valueOf(cell.getStringCellValue()));
						break;
					}
				}else if(argClazz==Float.class || argClazz==float.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, (float)cell.getNumericCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, Float.valueOf(cell.getStringCellValue()));
						break;
					}
				}else if(argClazz==String.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, String.valueOf(cell.getNumericCellValue()));
						break;
					case HSSFCell.CELL_TYPE_STRING:
						method.invoke(obj, cell.getStringCellValue());
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN:
						method.invoke(obj, String.valueOf(cell.getBooleanCellValue()));
						break;
					}
				}else if(argClazz==Boolean.class || argClazz==boolean.class){
					if(cell.getCellType()==HSSFCell.CELL_TYPE_BOOLEAN){
						method.invoke(obj, cell.getBooleanCellValue());
					}
				}else if(argClazz==Date.class){
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_NUMERIC:
						method.invoke(obj, cell.getDateCellValue());
						break;
					case HSSFCell.CELL_TYPE_STRING:
						String v=cell.getStringCellValue();
						Date d=null;
						try {
	                        d=DateFormat.parse(v);
                        } catch (ParseException e) {
                        	try {
	                            d=DateAndTimeFormat.parse(v);
                            } catch (ParseException e1) {
                            	try {
	                                d=DateFormat_1.parse(v);
                                } catch (ParseException e2) {
                                }
                            }
                        }
						
						method.invoke(obj, d);
						break;
					}
				}
			}
			datas.add(obj);
		}
		
		
		return datas;
	}
}
