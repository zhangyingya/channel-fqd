package com.tydic.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

/**
 * 
 * 文件拷贝工具类
 * @ClassName: CopyFileUtil
 * @author huanglinfeng@tydic.com
 * @date 2017年6月19日 上午11:09:57 
 *
 */
public class CopyFileUtil {
	
	/**
	 * 拷贝文件夹
	 * @Title: copyDir 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午11:12:16
	 * 
	 * @param srcDirPath
	 * @param destDirPath
	 * @param cover
	 * @throws IOException
	 */
	public static void copyDir(String srcDirPath, String destDirPath,boolean cover)throws IOException{
		File srcDir=new File(srcDirPath);
		if(!srcDir.exists()){
			throw new FileNotFoundException("源目录不存在!");
		}
		
		File destDir=new File(destDirPath);
		if(!destDir.exists()){
			destDir.mkdirs();
		}
		
		File[] _files=srcDir.listFiles();
		if(_files==null || _files.length<=0){
			return;
		}
		
		for(File _file : _files){
			File temp=new File(destDir.getPath()+File.separator+_file.getName());
			if(_file.isDirectory()){
				if(temp.exists()){
					if(temp.isDirectory()){
						copyDir(_file.getPath(), temp.getPath(), cover);
					}
				}else{
					copyDir(_file.getPath(), temp.getPath(), cover);
				}
			}else{
				if(temp.exists()){
					if(cover){
						if(temp.delete()){
							nioTransferCopy(_file, temp);
						}
					}
				}else{
					nioTransferCopy(_file, temp);
				}
			}
		}
	}

    private static void nioTransferCopy(File source, File target) throws IOException {  
        FileChannel in = null;  
        FileChannel out = null;  
        FileInputStream inStream = null;  
        FileOutputStream outStream = null;  
        try {  
            inStream = new FileInputStream(source);  
            outStream = new FileOutputStream(target);  
            in = inStream.getChannel();  
            out = outStream.getChannel();  
            in.transferTo(0, in.size(), out);  
        } catch (IOException e) {  
           throw e;
        } finally {
        	try {
				inStream.close();
			} catch (IOException e) {}
            try {
				in.close();
			} catch (IOException e) {}
            try {
				outStream.close();
			} catch (IOException e) {}
            try {
				out.close();
			} catch (IOException e) {}
        }  
    }  
}
