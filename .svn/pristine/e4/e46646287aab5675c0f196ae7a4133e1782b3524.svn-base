package com.tydic.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPFileFilter;
import org.apache.commons.net.ftp.FTPReply;

/**
 * 
 * FTP客户端
 * @ClassName: FtpClient 
 * @author huanglinfeng@tydic.com
 * @date 2017年6月19日 上午9:41:41 
 *
 */
public class FtpClient {
	
	private FTPClient client;
	
	public FtpClient(String url,int port,String username,String password) throws IOException{
		this.client = new FTPClient();
		int reply;
		try {
			client.connect(url, port);
			client.login(username, password);// 登录
			reply = client.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				client.disconnect();
			}
			
			//关闭钩子，释放资源
			Runtime.getRuntime().addShutdownHook(new Thread(){
				@Override
				public void run() {
					close();
				}
			});
		} catch (IOException e) {
			throw e;
		}
	}
	
	/**
	 * 注销登录 并关闭客户端
	 * @Title: closeClient 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午8:45:48
	 * 
	 * @param client
	 */
	public void close(){
		if (client!=null && client.isConnected()) {
			try {
				client.logout();
				client.disconnect();
			} catch (IOException e) {}
		}
	}
	
	/**
	 * 获取指定ftp目录文件名称
	 * @Title: listFileName 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午8:46:29
	 * 
	 * @param remotePath
	 * @return
	 * @throws IOException
	 */
	public List<String> listFileName(String remotePath) throws IOException{
		List<String> fileNames=null;
		
		String dir=remotePath.startsWith("/") ? remotePath : ("/"+remotePath);
		try {
			client.enterLocalPassiveMode();
			// 转移到FTP服务器目录
			client.changeWorkingDirectory(dir);
			FTPFile[] fs = client.listFiles();
			
			if(fs==null || fs.length<1){
				return null;
			}
			
			fileNames=new ArrayList<String>();
			for (FTPFile ff : fs) {
				if(ff.isDirectory()){
					continue;
				}
				
				fileNames.add(ff.getName());
			}
		} catch (IOException e) {
			throw e;
		}
		
		return fileNames;
	}
	
	/**
	 * 获取指定ftp目录、指定类型文件名称
	 * @Title: listFileName 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午8:47:48
	 * 
	 * @param client
	 * @param remotePath
	 * @param filter
	 * @return
	 * @throws IOException
	 */
	public List<String> listFileName(String remotePath,FTPFileFilter filter) throws IOException{
		List<String> fileNames=null;
		
		String dir=remotePath.startsWith("/") ? remotePath : ("/"+remotePath);
		try {
			client.enterLocalPassiveMode();
			FTPFile[] fs = client.listFiles(dir, filter);
			
			if(fs==null || fs.length<1){
				return null;
			}
			
			fileNames=new ArrayList<String>();
			for (FTPFile ff : fs) {
				if(ff.isDirectory()){
					continue;
				}
				
				fileNames.add(ff.getName());
			}
		} catch (IOException e) {
			throw e;
		}
		
		return fileNames;
	}
	
	/**
	 * 下载ftp文件
	 * @Title: downFile 
	 * @Description: TODO
	 * @param client
	 * @param remotePath
	 * @param fileName
	 * @param localPath
	 * @return
	 * @throws IOException
	 */
	public boolean downFile(String remotePath, final String fileName,
			String localPath) throws IOException {
		boolean result=false;
		InputStream in = null;
		OutputStream out =null;
		
		String dir=remotePath.startsWith("/") ? remotePath : ("/"+remotePath);
		try {
			client.enterLocalPassiveMode();
			client.setFileType(FTP.BINARY_FILE_TYPE);
			client.changeWorkingDirectory(dir);
			FTPFile[] fs = client.listFiles(dir, new FTPFileFilter() {
				@Override
				public boolean accept(FTPFile ff) {
					if(ff.getName().equals(fileName)){
						return true;
					}
					return false;
				}
			});
			
			if(fs!=null && fs.length>0){
				File localFile = new File(localPath + "/" + fs[0].getName());

				out = new FileOutputStream(localFile);
				//result=client.retrieveFile(fs[0].getName(), is);
				in = client.retrieveFileStream(fs[0].getName());  
                byte[] b = new byte[2048];  
                int length = 0;  
                while ((length = in.read(b)) != -1) {  
                	out.write(b, 0, length);  
                }  
				
			}
		} catch (IOException e) {
			throw e;
		} finally{
			if(in!=null){
				try {
					in.close();
				} catch (Exception e) {}
			}
			if(out!=null){
				try {
					out.close();
				} catch (IOException e) {}
			}
		}
		return result;
	}
	
	/**
	 * 下载ftp文件到指定输出流
	 * @Title: downFile 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:37:11
	 * 
	 * @param remotePath
	 * @param fileName
	 * @param os
	 * @return
	 * @throws IOException
	 */
	public void downFile(String remotePath, final String fileName,
			OutputStream out) throws IOException {
		
		String dir=remotePath.startsWith("/") ? remotePath : ("/"+remotePath);
		InputStream in = null;
		try {
			client.enterLocalPassiveMode();
			client.setFileType(FTP.BINARY_FILE_TYPE);
			client.changeWorkingDirectory(dir);
			FTPFile[] fs = client.listFiles(dir, new FTPFileFilter() {
				@Override
				public boolean accept(FTPFile ff) {
					if(ff.getName().equals(fileName)){
						return true;
					}
					return false;
				}
			});
			
			if(fs!=null && fs.length>0){
				//result=client.retrieveFile(fs[0].getName(), os);
				in = client.retrieveFileStream(fs[0].getName());  
                byte[] b = new byte[2048];  
                int length = 0;  
                while ((length = in.read(b)) != -1) {  
                	out.write(b, 0, length);  
                }
			}
		} catch (IOException e) {
			throw e;
		} finally{
			if(in!=null){
				try {
					in.close();
				} catch (Exception e) {}
			}
		}
	}
	
	/**
	 * 下载文件
	 * @Title: downDire 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:37:46
	 * 
	 * @param client
	 * @param ftpPath
	 * @param localPath
	 * @throws IOException
	 */
	public void downDire(String ftpPath,String localPath) throws IOException {
		String rootDire=ftpPath.substring(ftpPath.lastIndexOf("/")+1);
		
		String dir=ftpPath.startsWith("/") ? ftpPath : ("/"+ftpPath);
		try {
			client.enterLocalPassiveMode();
			client.setFileType(FTP.BINARY_FILE_TYPE);
			client.changeWorkingDirectory(dir);// 转移到FTP服务器目录
			FTPFile[] fs = client.listFiles();
			
			_downFile(client,fs,ftpPath,localPath+"/"+rootDire);
		} catch (IOException e) {
			throw e;
		}
	}
	
	/**
	 * 递归下载
	 * @Title: _downFile 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:38:48
	 * 
	 * @param client
	 * @param fs
	 * @param ftpPath
	 * @param localPath
	 * @throws IOException
	 */
	private void _downFile(FTPClient client,FTPFile[] fs,String ftpPath,String localPath)throws IOException{
		if(fs==null)
			return;
		
		
		for (FTPFile ff : fs) {
			if(".".equals(ff.getName()) || "..".equals(ff.getName())){
				continue;
			}
			
			OutputStream out = null;
			try {
				if(ff.isDirectory()){
					client.changeWorkingDirectory(ftpPath+"/"+ff.getName());
					_downFile(client,client.listFiles(),ftpPath+"/"+ff.getName(),localPath+"/"+ff.getName());
				}else{
					File dire=new File(localPath);
					if(!dire.exists()){
						dire.mkdirs();
					}
					
					File localFile = new File(localPath + "/" + ff.getName());
	
					out = new FileOutputStream(localFile);
					client.retrieveFile(ff.getName(), out);
					out.flush();
				}
			} catch (IOException e) {
				throw e;
			} finally{
				if(out!=null){
					try {
						out.close();
					} catch (Exception e) {}
				}
			}
		}
		
	}
	
	/**
	 * 上传
	 * @Title: uploadFile 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:39:40
	 * 
	 * @param ftpPath
	 * @param filename
	 * @param input
	 * @return
	 * @throws IOException
	 */
	public boolean uploadFile(String ftpPath, String filename,
			InputStream input) throws IOException {
		boolean result=false;
		
		String dir=ftpPath.startsWith("/") ? ftpPath : ("/"+ftpPath);
		try {
			client.enterLocalPassiveMode();
			client.setFileType(FTP.BINARY_FILE_TYPE);
			client.changeWorkingDirectory(dir);
			result=client.storeFile(filename, input);
		} catch (IOException e) {
			throw e;
		} finally{
			try {
				input.close();
			} catch (IOException e) {
			}
		}
		return result;
	}
	
	/**
	 * 删除ftp文件
	 * @Title: deleteFile 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:40:36
	 * 
	 * @param ftpPath
	 * @return
	 * @throws IOException
	 */
	public boolean deleteFile(String ftpPath) throws IOException{
		boolean result=false;
		
		String dir=ftpPath.startsWith("/") ? ftpPath.substring(0,1) : ftpPath;
		try {
			client.changeWorkingDirectory("/");
			result=client.deleteFile(dir);
		} catch (IOException e) {
			throw e;
		} 
		return result;
	}
	
	/**
	 * 修改文件名
	 * @Title: rename 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月19日 上午9:41:09
	 * 
	 * @param from
	 * @param to
	 * @return
	 * @throws IOException
	 */
	public boolean rename(String from,String to)throws IOException{
		boolean result=false;
		
		try {
			client.changeWorkingDirectory("/");
			result=client.rename(from, to);
		} catch (IOException e) {
			throw e;
		} 
		return result;
	}
	
	/**
	 * 上传文件或文件夹
	 * @param file
	 * @throws Exception
	 */
	 public void uploadFile(File file,String ftpPath) throws Exception{  
		 try {
			 // 创建ftp客户端
			 client.setFileType(FTP.BINARY_FILE_TYPE);
			 // 指定ftp路径
			 String dir=ftpPath.startsWith("/") ? ftpPath : ("/"+ftpPath);
			 createDir(client, dir);
			 client.changeWorkingDirectory(dir);
			 //遍历文件夹，上传文件
	        if(file.isDirectory()){           
	        	client.makeDirectory(file.getName());  
	            ftpPath = ftpPath+"/"+file.getName();// 下一目录
	            client.changeWorkingDirectory(file.getName());      
	            String[] files = file.list();             
	            for (int i = 0; i < files.length; i++) {      
	                File file1 = new File(file.getPath()+"/"+files[i] );      
	                if(file1.isDirectory()){  
	                	uploadFile(file1,ftpPath);      
	                }else{                    
	                    File file2 = new File(file.getPath()+"/"+files[i]);      
	                    FileInputStream input = new FileInputStream(file2);   
	                    client.storeFile(new String(file2.getName().getBytes(),"iso-8859-1"), input);    
	                    input.close();  
	                }                 
	            }      
	        }else{      
	            File file2 = new File(file.getPath());      
	            FileInputStream input = new FileInputStream(file2);      
	            client.storeFile(new String(file2.getName().getBytes(),"iso-8859-1"), input);      
	            input.close();        
	        }   
		} catch (Exception e) {
			throw e;
		}
		   
	}  
	 
	/**
	 * 创建文件夹
	 * @param ftp
	 * @param dirname
	 * @throws Exception
	 */
 	public void createDir(FTPClient ftp,String dirname) throws Exception{
	    try{
	        ftp.makeDirectory(dirname);
	    }catch(Exception ex){
	    	throw ex;
	    }
	}
	 
}
