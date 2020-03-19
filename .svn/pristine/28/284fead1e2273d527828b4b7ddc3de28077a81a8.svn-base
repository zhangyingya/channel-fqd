package com.tydic.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.apache.tools.zip.ZipOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * zip文件工具类
 * 
 * @author yuanxh
 * 
 */
public class ZipUtil {
	
	private final static Logger LOGGER=LoggerFactory.getLogger(ZipUtil.class);
	public final static int BUFFER = 4 * 1024 * 1024;
	private static final String ENCODE = System.getProperty("sun.jnu.encoding");
	
	/** 
     * 将一个文件或目录压缩成一个zip文件 
     * @param srcPath 文件或目录路径 
     * @param destPath 目标路径 
     * @throws IOException 
     */  
    public static void zip(String srcPath, String destPath) throws IOException {  
    	zip(new File(srcPath), new File(destPath), null, null);  
    }  
  
    /** 
     * 将一个文件或目录压缩成一个zip文件 
     * @param srcPath 文件或目录路径 
     * @param destPath 目标路径 
     * @param comment 压缩包注释 
     * @throws IOException 
     */  
    public static void zip(String srcPath, String destPath, String comment) throws IOException {  
    	zip(new File(srcPath), new File(destPath), comment, null);  
    }  
  
    /** 
     * 将一个文件或目录压缩成一个zip文件 
     * @param srcFile 文件或目录 
     * @param destFile 目标文件 
     * @param comment 压缩包注释 
     * @throws IOException 
     */  
    public static void zip(File srcFile, File destFile, String comment) throws IOException {  
    	zip(srcFile, destFile, comment, null);  
    }  
  
    /** 
     * 将一个文件或目录压缩成一个zip文件 
     * @param srcFile 文件或目录 
     * @param destFile 目标文件 
     * @param comment 压缩包注释 
     * @param filter 过滤文件(正则表达式) 
     * @throws IOException 
     */  
    public static void zip(File srcFile, File destFile, String comment, List<String> filter) throws IOException {  
        List<File> fileList = new ArrayList<File>();  
        fileList.add(srcFile);  
        zip(fileList, destFile, comment, filter, false);  
    }  
  
    /** 
     * 将一组文件或目录压缩成一个zip文件 
     * @param fileList 文件或目录列表 
     * @param destFile 目标文件 
     * @param comment 压缩包注释 
     * @param filter 过滤文件(正则表达式) 
     * @throws IOException 
     */  
    public static void zip(List<File> fileList, File destFile, String comment, List<String> filter)  
            throws IOException {  
    	zip(fileList, destFile, comment, filter, false);  
    }  
  
    /** 
     * 将一组文件或目录压缩成一个zip文件 
     * @param fileList 文件或目录列表 
     * @param destFile 目标文件 
     * @param comment 压缩包注释 
     * @param filter 过滤文件(正则表达式) 
     * @param ignoreError 忽略错误 
     * @throws IOException 
     */  
    public static void zip(List<File> fileList, File destFile, String comment, List<String> filter,  
            boolean ignoreError) throws IOException {  
        if (destFile.isDirectory()) {  
            String name = destFile.getName() + ".zip";  
            destFile = new File(destFile, name);  
            if (filter != null) {  
                filter = new ArrayList<String>();  
            }  
            filter.add(name);  
        }  
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(destFile));  
        try {  
            zos.setEncoding(ENCODE);  
            for (File file : fileList) {  
                if (fileList.size() == 1) {  
                	zip(zos, file, "", comment, filter, ignoreError);  
                } else {  
                	zip(zos, file, file.getName(), comment, filter, ignoreError);  
                }  
            }  
        } finally {  
            if(zos!=null){
            	try {
					zos.close();
				} catch (Exception e) {
				}
            }
        }  
    }  
  
    /** 
     * 添加文件到压缩包中 
     * @param zipFile 
     * @param file 
     * @param entryPath 
     * @throws IOException 
     */  
    public static void addFileToZip(File zipFile, File file, String entryPath) throws IOException {  
        addFileToZip(zipFile, new File[] { file }, new String[] { entryPath });  
    }  
  
    /** 
     * 添加文件到压缩包中 
     * @param zipFile 
     * @param files 
     * @param entryPaths 
     * @throws IOException 
     */  
    public static void addFileToZip(File zipFile, File[] files, String[] entryPaths) throws IOException {  
        File tempFile = File.createTempFile(zipFile.getName(), null);  
        tempFile.delete();  
        boolean renameOk = zipFile.renameTo(tempFile);  
        if (!renameOk) {  
            throw new RuntimeException("could not rename the file " + zipFile.getAbsolutePath() + " to "  
                    + tempFile.getAbsolutePath());  
        }  
        addFileToZip(tempFile, zipFile, files, entryPaths);  
    }  
  
    /** 
     * 添加文件到压缩包中 
     * @param srcZip 
     * @param destZip 
     * @param files 
     * @param entryPaths 
     * @throws IOException 
     */  
    public static void addFileToZip(File srcZip, File destZip, File[] files, String[] entryPaths) throws IOException {  
        byte[] buffer = new byte[BUFFER];  
        ZipFile zipFile = new ZipFile(srcZip, ENCODE);  
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(destZip));  
        try {  
            out.setEncoding(ENCODE);  
            Enumeration<?> e = zipFile.getEntries();  
            while (e.hasMoreElements()) {  
                ZipEntry entry = (ZipEntry) e.nextElement();  
                String name = entry.getName();  
                boolean notInFiles = true;  
  
                String entryName = "";  
                for (int i = 0; i < files.length; i++) {  
                    File file = files[i];  
                    if (entryPaths != null && i < entryPaths.length) {  
                        entryName = entryPaths[i];  
                    }  
                    if ((entryName + "/" + file.getName()).equals(name)) {  
                        notInFiles = false;  
                        break;  
                    }  
                }  
                if (notInFiles) {  
                    out.putNextEntry(new ZipEntry(name));  
                    InputStream is = zipFile.getInputStream(entry);  
                    int length = 0;  
                    while ((length = is.read(buffer, 0, BUFFER)) != -1) {  
                        out.write(buffer, 0, length);  
                    }  
                }  
            }  
            String entryName = "";  
            for (int i = 0; i < files.length; i++) {  
                File file = files[i];  
                if (entryPaths != null && i < entryPaths.length) {  
                    entryName = entryPaths[i];  
                }  
                if (file.isDirectory()) {  
                    zip(out, file, entryName, "", null, false);  
                } else {  
                	zip(out, file, entryName + "/" + file.getName(), "", null, false);  
                }  
            }  
        } finally {  
            try {
				zipFile.close();
			} catch (Exception e) {
			}  
            try {
				out.close();
			} catch (Exception e) {
			}  
        }  
    }  
  
    /** 
     * 将一组文件或目录压缩到一个Zip输出流中 
     * @param out zip输出流 
     * @param srcFile 文件或目录 
     * @param name 压缩包中的名称 
     * @param comment 压缩包注释 
     * @param filter 过滤文件(正则表达式) 
     * @param ignoreError 忽略错误 
     * @throws IOException 
     */  
    public static void zip(ZipOutputStream out, File srcFile, String name, String comment, List<String> filter,  
            boolean ignoreError) throws IOException {  
        if (srcFile.exists() == false) {  
            throw new IOException(srcFile.getAbsolutePath() + "文件或目录不存在");  
        }  
        try {  
            if (srcFile.isDirectory()) {  
                File[] files = srcFile.listFiles();  
                name = name.length() == 0 ? "" : name + "/";  
                if (!isFilter(name, filter) && name.length() != 0) {  
                    out.putNextEntry(new ZipEntry(name));  
                }  
                for (File file : files) {  
                	zip(out, file, name + file.getName(), comment, filter, ignoreError);  
                }  
            } else {  
                if (!isFilter(name, filter)) {  
                    name = name.length() == 0 ? srcFile.getName() : name;  
                    ZipEntry zipEntry = new ZipEntry(name);  
                    zipEntry.setComment(comment);  
                    out.putNextEntry(zipEntry);  
                    FileInputStream in = null;  
                    try {  
                        in = new FileInputStream(srcFile);  
                        int length = 0;  
                        byte[] buffer = new byte[BUFFER];  
                        while ((length = in.read(buffer, 0, BUFFER)) != -1) {  
                            out.write(buffer, 0, length);  
                        }  
                    } finally {  
                        if(in!=null){
                        	try {
								in.close();
							} catch (Exception e) {
							}
                        }
                    }  
                }  
            }  
        } catch (IOException e) {  
            if (ignoreError) {  
            	LOGGER.warn("compress zip ignore error: ");  
            	LOGGER.warn(e.getMessage(), e);  
            } else {  
                throw e;  
            }  
        }  
    }  
  
    /** 
     * 指定的名称是否被过滤 
     * @param base 
     * @param filter 过滤列表(正则表达式) 
     * @return 
     */  
    private static boolean isFilter(String base, List<String> filter) {  
        if (filter != null && !filter.isEmpty()) {  
            for (int i = 0; i < filter.size(); i++) {  
                Pattern pat = Pattern.compile(filter.get(i));  
                Matcher mat = pat.matcher(base);  
                if (mat.find()) {  
                    return true;  
                }  
            }  
        }  
        return false;  
    }
	
	public static void unZip(String srcFile, String dest, boolean deleteFile)
			throws Exception {
		org.apache.tools.zip.ZipFile zipFile=null;
		try {
			File file = new File(srcFile);
			if (ObjectIsNull.check(dest)) {
				dest = file.getParent();
			}
			if (!file.exists()) {
				throw new Exception("解压文件不存在!");
			}
			zipFile = new org.apache.tools.zip.ZipFile(file, "GB2312");
			Enumeration<?> e = zipFile.getEntries();
			
			InputStream is = null;
			FileOutputStream fos = null;
			while (e.hasMoreElements()) {
				try {
					ZipEntry zipEntry = (ZipEntry) e.nextElement();
					if (zipEntry.isDirectory()) {
						String name = zipEntry.getName();
						name = name.substring(0, name.length() - 1);
						File f = new File(dest + File.separator + name);
						f.mkdirs();
					} else {
						File f = new File(dest + File.separator + zipEntry.getName());
						f.getParentFile().mkdirs();
						f.createNewFile();
						is = zipFile.getInputStream(zipEntry);
						fos = new FileOutputStream(f);
						int length = 0;
						byte[] b = new byte[1024];
						while ((length = is.read(b, 0, 1024)) != -1) {
							fos.write(b, 0, length);
						}
					}
				} catch (Exception ex) {
					throw ex;
				} finally{
					if(is != null) {
						try {
							is.close();
						} catch (Exception ex) {
						}
					}
					if(fos != null) {
						try {
							fos.close();
						} catch (Exception ex) {}
					}
				}
			}
			if (deleteFile) {
				file.deleteOnExit();
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (zipFile != null) {
				zipFile.close();
			}
		}
		
	}

	public static String getZipComment(String srcFile) throws Exception {
		String comment = "";
		try {
			org.apache.tools.zip.ZipFile zipFile = new org.apache.tools.zip.ZipFile(
					srcFile);
			Enumeration<?> e = zipFile.getEntries();

			while (e.hasMoreElements()) {
				ZipEntry ze = (ZipEntry) e.nextElement();

				comment = ze.getComment();
				if (comment != null && !comment.equals("")
						&& !comment.equals("null")) {
					break;
				}
			}
			zipFile.close();
		} catch (Exception e) {
			throw e;
		}

		return comment;
	}
	
}
