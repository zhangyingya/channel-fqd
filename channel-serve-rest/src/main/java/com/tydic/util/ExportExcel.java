package com.tydic.util;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;

public class ExportExcel {
	@Resource
	private static final Log logger = LogFactory.getLog(ExportExcel.class);

	HttpServletResponse response;
	HttpServletRequest request;
	ServletOutputStream outStream;
	OutputStream os;
	Long beginTime;

	public ExportExcel(HttpServletResponse response, HttpServletRequest request) {
		this.response = response;
		this.request = request;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean isDoubleHeader(List<Map> haderList) {
		for (Map map : haderList) {
			if (map.containsKey("subList")) {
				List<Map> subList = (List<Map>) map.get("subList");
				if (subList.size() > 0) {
					return true;
				}
			}
		}
		return false;
	}
	
	  /** 
     * Create a library of cell styles 
     */  
    @SuppressWarnings("deprecation")
	private static Map<String, CellStyle> createStyles(Workbook wb) {  
        Map<String, CellStyle> styles = new HashMap<String, CellStyle>();  
        CellStyle style;  
        Font titleFont = wb.createFont();  
        titleFont.setFontHeightInPoints((short) 18);  
        titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_CENTER);  
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        style.setFont(titleFont);  
        styles.put("title", style);  
  
        Font monthFont = wb.createFont();  
        monthFont.setFontHeightInPoints((short) 11);  
        monthFont.setColor(IndexedColors.WHITE.getIndex());  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_CENTER);  
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        style.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());  
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);  
        style.setFont(monthFont);  
        style.setWrapText(true);  
        styles.put("header", style);  
  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_CENTER);  
        style.setWrapText(true);  
        style.setBorderRight(CellStyle.BORDER_THIN);  
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderLeft(CellStyle.BORDER_THIN);  
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderTop(CellStyle.BORDER_THIN);  
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderBottom(CellStyle.BORDER_THIN);  
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());  
        styles.put("cell", style);  
  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_CENTER);  
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());  
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);  
        style.setDataFormat(wb.createDataFormat().getFormat("0.00"));  
        styles.put("formula", style);  
          
        //普通单元格，四周有黑线  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_RIGHT);  
        style.setWrapText(true);  
        style.setBorderRight(CellStyle.BORDER_THIN);  
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderLeft(CellStyle.BORDER_THIN);  
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderTop(CellStyle.BORDER_THIN);  
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderBottom(CellStyle.BORDER_THIN);  
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());  
        style.setDataFormat(wb.createDataFormat().getFormat("#,##0"));//这样写百分百变成货币  
        styles.put("normalcell", style);  
          
        //横向求和公式，粗体，有淡紫色背景，四周有黑色  
        style = wb.createCellStyle();  
        XSSFCellStyle styleTemp=((XSSFCellStyle)style);  
        styleTemp.setAlignment(CellStyle.ALIGN_RIGHT);  
        styleTemp.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        Font formulaFont = wb.createFont();  
        formulaFont.setFontName("宋体");  
        formulaFont.setFontHeightInPoints((short) 11);  
        formulaFont.setBoldweight(Font.BOLDWEIGHT_BOLD);  
        styleTemp.setFont(formulaFont);  
        //控制颜色  
//        styleTemp.setFillForegroundColor(new HSSFColor(new Color(220, 230, 241)));  
//      style.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.getIndex());  
        styleTemp.setFillPattern(CellStyle.SOLID_FOREGROUND);  
          
        styleTemp.setBorderRight(CellStyle.BORDER_THIN);  
        styleTemp.setRightBorderColor(IndexedColors.BLACK.getIndex());  
        styleTemp.setBorderLeft(CellStyle.BORDER_THIN);  
        styleTemp.setLeftBorderColor(IndexedColors.BLACK.getIndex());  
        styleTemp.setBorderTop(CellStyle.BORDER_THIN);  
        styleTemp.setTopBorderColor(IndexedColors.BLACK.getIndex());  
        styleTemp.setBorderBottom(CellStyle.BORDER_THIN);  
        styleTemp.setBottomBorderColor(IndexedColors.BLACK.getIndex());  
        styleTemp.setDataFormat(wb.createDataFormat().getFormat("#,##0"));  
        styles.put("formula_h", styleTemp);//横向的公式颜色  
          
        //纵向求和公式，四周有黑线  
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_RIGHT);  
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        style.setBorderRight(CellStyle.BORDER_THIN);  
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderLeft(CellStyle.BORDER_THIN);  
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderTop(CellStyle.BORDER_THIN);  
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());  
        style.setBorderBottom(CellStyle.BORDER_THIN);  
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());  
        style.setDataFormat(wb.createDataFormat().getFormat("#,##0"));  
        styles.put("formula_v", style);//纵向的公式颜色  
          
        style = wb.createCellStyle();  
        style.setAlignment(CellStyle.ALIGN_CENTER);  
        style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);  
        style.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());  
        style.setFillPattern(CellStyle.SOLID_FOREGROUND);  
        style.setDataFormat(wb.createDataFormat().getFormat("0.00"));  
        styles.put("formula_2", style);  
        return styles;  
    }  
	
    @SuppressWarnings({ "rawtypes", "unchecked", "unused" })
	public void exportExcelToFile(String filePath, String fileName, String waterRemark, List<Map> haderList, List<Map> dataList) {
    	OutputStream os = null;
		try {
			byte[] byteArray = null;
			if(waterRemark != null) {
				byteArray = createWatermarkPng(waterRemark);
			}
			SXSSFWorkbook wb = new SXSSFWorkbook();
			Map<String, CellStyle> styles= createStyles(wb);
			CellStyle titleStyle = styles.get("title");
			CellStyle headerStyle = styles.get("header");
			CellStyle cellStyle = styles.get("cell");
			SXSSFSheet sheet = wb.createSheet(fileName);
			//生成用于插入图片的容器--这个方法返回的类型在老api中不同
            final Drawing patriarch = sheet.createDrawingPatriarch();
			SXSSFRow  headRow1 = null;
			SXSSFRow  headRow2 = null;
			int rowNum = 0;
			int colunmNum = 0;
			Map<Integer, String> dataMap = new HashMap<Integer, String>();
			for (int i = 0; i < haderList.size(); i++) {
				Map map = haderList.get(i);
				if(map.get("width") == null) {
					sheet.setColumnWidth(i, 3800);
				} else {
					sheet.setColumnWidth(i, Integer.parseInt(map.get("width").toString()));
				}
				
				if (headRow1 == null)
					headRow1 = sheet.createRow(rowNum++);
				if (map.containsKey("subList")) {
					List<Map> subList = (List<Map>) map.get("subList");
					// 单元格合并 四个参数分别是：起始行，结束行，起始列，结束列
					sheet.addMergedRegion(new CellRangeAddress(0, 0, colunmNum,
							colunmNum + subList.size() - 1));
					SXSSFCell cell = headRow1.createCell(colunmNum);
					cell.setCellValue(String.valueOf(map.get("title")));
					cell.setCellStyle(headerStyle); // 样式
					for (int j = 0; j < subList.size(); j++) {
						Map subMap = subList.get(j);
						if (headRow2 == null) {
							headRow2 = sheet.createRow(rowNum++);
						}
						sheet.setColumnWidth(j, 100 * 40);   
						SXSSFCell cell1 = headRow2.createCell(colunmNum);
						cell1.setCellValue(String.valueOf(subMap.get("title")));
						cell1.setCellStyle(headerStyle);
						dataMap.put(colunmNum,
								String.valueOf(subMap.get("name")));
						colunmNum++;
					}
				} else {
					if (isDoubleHeader(haderList)) {
						sheet.addMergedRegion(new CellRangeAddress(0, 1,
								colunmNum, colunmNum));
					}
					SXSSFCell cell1 = headRow1.createCell(colunmNum);
					cell1.setCellValue(String.valueOf(map.get("title")));
					cell1.setCellStyle(headerStyle);
					dataMap.put(colunmNum, String.valueOf(map.get("name")));
					colunmNum++;
				}
			}
			int rowDataNum = 0;
			for (Map tempMap : dataList) {
				SXSSFRow row = sheet.createRow(rowNum++);
				for (int i = 0; i < colunmNum; i++) {
					String columnName = dataMap.get(i);
					String columnValue = "";
					if (columnName != null) {
						columnValue = String.valueOf(tempMap.get(columnName)) == "null" ? ""
								: String.valueOf(tempMap.get(columnName));
					}
					SXSSFCell cell = row.createCell(i);
					cell.setCellStyle(cellStyle); // 样式
					cell.setCellValue(columnValue); // 跨单元格显示的数据
				}
				
				if(byteArray != null && rowDataNum % 100 == 0) {
					//设置每张图片插入位置
	                final XSSFClientAnchor anchor = new XSSFClientAnchor(0, 0, Short.MAX_VALUE, Integer.MAX_VALUE, 3,
	                		rowDataNum, 4, 10);//参数为图片插入在表格的坐标，可以自行查看api研究参数
	               // anchor.setAnchorType(0);
	                // 插入图片
	                Picture pic =  patriarch.createPicture(anchor, wb.addPicture(
	                		byteArray, HSSFWorkbook.PICTURE_TYPE_JPEG));
	                pic.resize();
				}
				rowDataNum++;
			}
			
			File dirs = new File(filePath);
			if(!dirs.exists()) {
				dirs.mkdirs();
			}
			File tempFile = new File(filePath+"/"+fileName);
			if(!tempFile.exists()) {
				tempFile.createNewFile();
			}
			os = new FileOutputStream(tempFile);
			wb.write(os);
		} catch (Exception ex) {
			logger.error(ex.getMessage(), ex);
		} finally {
			if(os != null) {
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
	}
    public static byte[] createWatermarkPng(String logoName)
    	    throws IOException
    	  {
    	    BufferedImage bi = new BufferedImage(300, 150, 6);

    	    int minx = bi.getMinX();
    	    int miny = bi.getMinY();
    	    for (int i = minx; i < 300; ++i) {
    	      for (int j = miny; j < 150; ++j) {
    	        bi.setRGB(i, j, 16777215);
    	      }
    	    }

    	    Graphics2D g2d = bi.createGraphics();

    	    g2d.setColor(new Color(72, 61, 139));

    	    g2d.setStroke(new BasicStroke(1.0F));

    	    g2d.setFont(new java.awt.Font("华文细黑", 2, 25));

    	    g2d.rotate(Math.toRadians(-10.0D));

    	    g2d.drawString(logoName, 0, 110);

    	    g2d.setComposite(AlphaComposite.getInstance(3));

    	    g2d.dispose();

    	    byte[] byteArray = null;

    	    ByteArrayOutputStream outputStream = null;
    	    try {
    	      outputStream = new ByteArrayOutputStream();
    	      ImageIO.write(bi, "png", outputStream);
    	      byteArray = outputStream.toByteArray();
    	    } catch (IOException e) {
    	      e.printStackTrace();
    	    } finally {
    	      if (outputStream != null) {
    	        outputStream.close();
    	      }
    	    }
    	    return byteArray;
    	  }
    
    public static void main(String[] args) throws IOException {
    /*	System.out.println(System.currentTimeMillis()/1000);
    	ExcelPoi.excel2007("123456",null,"系统管理员绝密文件",
    			"D:\\tomcat\\esmp_new\\apache-tomcat-7.0.69\\bin\\files\\excelFile\\员工列表.xlsx");
    	System.out.println(System.currentTimeMillis()/1000);*/
    }

}
