package com.tydic.common.ssh;

import java.io.File;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;
import com.jcraft.jsch.SftpProgressMonitor;

/**
 * 
 * sftp客户端
 * 注意：线程不安全
 * @ClassName: SftpClient 
 * @author huanglinfeng@tydic.com
 * @date 2017年9月21日 下午2:18:33 
 *
 */
public class SftpClient extends TimerTask implements SftpProgressMonitor{

	private SSHHelper helper;
	private ChannelSftp sftp;
	
	/**
	 * 上传进度监控相关参数 begin
	 */
	// 默认间隔时间为5秒
	private long progressInterval = 500;
	// 记录传输是否结束
    private boolean isEnd = false;
    // 记录已传输的数据总大小
    private long transfered;
    // 记录文件总大小
    private long fileSize;
    // 定时器对象
    private Timer timer;
    // 记录是否已启动timer记时器
    private boolean isScheduled = false;
	
	public SftpClient(String host,Integer port,String username,String password) throws Exception{
		helper=new SSHHelper(host, port, username, password);
		sftp=helper.getChannelSftp();
		sftp.connect();
		
		//关闭钩子，释放资源
		Runtime.getRuntime().addShutdownHook(new Thread(){
			@Override
			public void run() {
				close();
			}
		});
	}
	
	/**
	 * 上传文件
	 * @Title: put 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年9月21日 下午4:01:29
	 * 
	 * @param localFilePath
	 * @param dest
	 * @throws SftpException
	 */
	public void put(String localFilePath,String dest) throws SftpException{
		File file=new File(localFilePath);
		fileSize=file.length();
		sftp.put(file.getPath(),dest, this ,ChannelSftp.OVERWRITE);
	}
	
	public void put(InputStream in,String dest) throws SftpException{
		sftp.put(in, dest, ChannelSftp.OVERWRITE);
	}
	
	public void rename(String oldpath, String newpath) throws SftpException{
		sftp.rename(oldpath, newpath);
	}
	
	/**
	 * 获取文件
	 * @Title: get 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年9月21日 下午4:01:42
	 * 
	 * @param remoteFilePath
	 * @param localDir
	 * @throws SftpException
	 */
	public void get(String remoteFilePath,String localDir) throws SftpException{
		if(!localDir.endsWith(File.separator)){
			localDir+=File.separator;
		}
		SftpATTRS attr = sftp.stat(remoteFilePath);
        fileSize = attr.getSize();
		sftp.get(remoteFilePath, localDir+remoteFilePath.substring(remoteFilePath.lastIndexOf("/")), this, ChannelSftp.OVERWRITE);
	}
	
	public void del(String remotePath) throws SftpException{
		SftpATTRS attr = sftp.stat(remotePath);
		if(attr.isDir()){
			sftp.rmdir(remotePath);
		}
		if(attr.isReg()){
			sftp.rm(remotePath);
		}
	}
	
	/**
	 * 列出文件
	 * @Title: listFiles 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年9月21日 下午4:01:55
	 * 
	 * @param remoteDir
	 * @return
	 * @throws SftpException
	 */
	@SuppressWarnings("unchecked")
	public List<SftpFile> listFiles(String remoteDir) throws SftpException{
		List<SftpFile> list=new ArrayList<SftpFile>();
		Iterator<LsEntry> i=sftp.ls(remoteDir).iterator();
		while(i.hasNext()){
			LsEntry entry=(LsEntry)i.next();
			if(!entry.getAttrs().isDir() && !entry.getAttrs().isReg()){
				continue;
			}
			SftpFile file=new SftpFile();
			file.setName(entry.getFilename());
			file.setLongname(entry.getLongname());
			file.setSize(entry.getAttrs().getSize());
			list.add(file);
		}
		return list;
	}
	
	public void close(){
		try {
			if(sftp!=null){
				sftp.disconnect();
			}
		} catch (Exception e) {}
		try {
			if(helper!=null){
				helper.close();
			}
		} catch (Exception e) {}
	}
	
	@Override
    public void run() {
        if (!isEnd()) { // 判断传输是否已结束
            long transfered = getTransfered();
            if (transfered != fileSize) { // 判断当前已传输数据大小是否等于文件总大小
                System.out.print("已传输: " + transfered + " 字节");
                sendProgressMessage(transfered);
            } else { // 如果当前已传输数据大小等于文件总大小，说明已完成，设置end
                setEnd(true);
            }
        } else {
        	// 如果传输结束，停止timer记时器
            stop();
            return;
        }
    }
    
    public void stop() {
        if (timer != null) {
            timer.cancel();
            timer.purge();
            timer = null;
            isScheduled = false;
        }
    }
    
    public void start() {
        if (timer == null) {
            timer = new Timer();
        }
        timer.schedule(this, 1000, progressInterval);
        isScheduled = true;
        System.out.println("开始传输文件...");
    }
    
    /**
     * 打印progress信息
     * @Title: sendProgressMessage 
     * @author huanglinfeng@tydic.com
     * @date 2017年9月21日 下午1:41:09
     * 
     * @param transfered
     */
    private void sendProgressMessage(long transfered) {
        if (fileSize != 0) {
            double d = ((double)transfered * 100)/(double)fileSize;
            DecimalFormat df = new DecimalFormat( "#.##"); 
            System.out.println("【" + df.format(d) + "%】");
        }
    }

    /**
     * 实现了SftpProgressMonitor接口的count方法
     */
    @Override
    public boolean count(long count) {
        if (isEnd()) return false;
        if (!isScheduled) {
            start();
        }
        add(count);
        return true;
    }

    /**
     * 实现了SftpProgressMonitor接口的end方法
     */
    @Override
    public void end() {
        setEnd(true);
        System.out.println("已传输: " + transfered + " 字节【100%】");
        System.out.println("文件传输完成.");
    }
    
    private void add(long count) {
        transfered = transfered + count;
    }
    
    private long getTransfered() {
        return transfered;
    }
    
    public void setTransfered(long transfered) {
        this.transfered = transfered;
    }
    
    private void setEnd(boolean isEnd) {
        this.isEnd = isEnd;
    }
    
    private boolean isEnd() {
        return isEnd;
    }

    @Override
    public void init(int op, String src, String dest, long max) {
    }

}
