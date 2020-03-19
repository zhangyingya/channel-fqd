package com.tydic.common.ssh;

import java.io.InputStreamReader;
import java.util.Properties;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;

/**
 * 
 * ssh协议操作远程服务器
 * @ClassName: SSHHelper 
 * @author huanglinfeng@tydic.com
 * @date 2017年9月21日 下午1:14:55 
 *
 */
public class SSHHelper {
	
	private String host;
	private Integer port;
	private String username;
	private String password;
	private Session session;
	
	public SSHHelper(String host,Integer port,String username,String password)throws Exception{
		this.host=host;
		this.port=port;
		this.username=username;
		this.password=password;
		
		connect();
	}
	
	private void connect() throws Exception{
		JSch jsch=new JSch();
		try {
			if(port!=null){
				session=jsch.getSession(username, host, port);
			}else{
				session=jsch.getSession(username, host);
			}
			
			session.setPassword(password);
			
            Properties config = new Properties();
            //设置第一次登陆的时候提示，可选值:(ask | yes | no)
            config.put("StrictHostKeyChecking", "no");
	        config.put("PasswordAuthentication", "no");
	        config.put("kex", "KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha1,diffie-hellman-group1-sha1");
	        config.put("userauth.gssapi-with-mic", "no");
			session.setConfig(config);
			session.setTimeout(0);
            
            //连接超时时间
            session.connect(5000);
		} catch (JSchException e) {
			throw e;
		}
	}
	
	public void close(){
        if(session!=null && session.isConnected()){
        	try {
				session.disconnect();
			} catch (Exception e) {}
        	session=null;
        }
    }
	
	/**
	 * 执行命令
	 * @Title: execCmd 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年9月21日 下午1:15:40
	 * 
	 * @param command
	 * @param delay
	 * @return
	 * @throws Exception
	 */
	public SSHExecRes execCmd(String command,String charsetName) throws Exception{
        SSHExecRes result = null;
        StringBuffer strBuffer = new StringBuffer();
        StringBuffer errResult=new StringBuffer();

        Channel channel = session.openChannel("exec");
        ChannelExec ssh = (ChannelExec) channel;
        
        ssh.setCommand(command);
        ssh.connect();
        
        InputStreamReader is1 = null;
        InputStreamReader is2 = null;
        try {
        	is1=new InputStreamReader(ssh.getInputStream(), charsetName);
        	is2=new InputStreamReader(ssh.getErrStream(), charsetName);
        	
        	int nextChar;
			while ((nextChar = is1.read()) != -1) {
				strBuffer.append((char) nextChar);
			}
			
			while ((nextChar = is2.read()) != -1) {
				errResult.append((char) nextChar);
			}
			
			result=new SSHExecRes(ssh.getExitStatus(), strBuffer.toString(), errResult.toString());
        } catch(Exception e){
        	throw e;
        } finally {
        	if(is1!=null){
        		try {
					is1.close();
				} catch (Exception e) {}
        	}
        	if(is1!=null){
        		try {
					is2.close();
				} catch (Exception e) {}
        	}
            channel.disconnect();
        }
        return result;
    }
	
	public boolean fileExist(String file) {
		ChannelSftp channel=null;
		try{
			channel=getChannelSftp();
			channel.connect();
			
			SftpATTRS sftpAttrs=channel.lstat(file);
			if(sftpAttrs.isDir() || sftpAttrs.isReg()){
				return true;
			}else{
				return false;
			}
		} catch(Exception e){
			return false;
		} finally {
            channel.disconnect();
        }
	}
	
	public ChannelSftp getChannelSftp() throws Exception{
		return (ChannelSftp)session.openChannel("sftp");
	}
	
}
