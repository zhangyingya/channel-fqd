package com.tydic.common.file;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;  
  
/**
 *  
 * 文件加密 加密方法：三重des加密 
 * 加密后，密钥会写入到文件的前48个字符中
 * @ClassName: FileEncrypt 
 * @author huanglinfeng@tydic.com
 * @date 2017年7月3日 上午9:34:56 
 *
 */
public class FileEncrypt {
	
	public static void main(String[] args) throws Exception {
		//String key=FileEncrypt.createKey("88", "99", "77");
		//FileEncrypt.encrypt(new File("e:\\20170703.xlsx"),key);
		FileEncrypt.decrypt(new File("D:\\项目文档\\迪科项目文档\\电信资产管理系统\\安装包\\AIX_20171013.xlsx"));
	}
	
    /**
     * 加密
     * @Title: encrypt 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 上午9:15:13
     * 
     * @param fileIn 要加密的文件
     * @param key 密钥，48位
     * @throws Exception
     */
    public static void encrypt(File fileIn, String key) throws Exception {  
    	if (key.length() != 48) {
    		throw new IllegalArgumentException("参数错误：密钥必须为 48 位!");
    	}
    	
    	byte[] key1 = getKeyByStr(key.substring(0, 16));  
        byte[] key2 = getKeyByStr(key.substring(16, 32));  
        byte[] key3 = getKeyByStr(key.substring(32, 48));
    	
        InputStream in = null;
        FileOutputStream out=null;
        try {  
        	in = new FileInputStream(fileIn);  
            byte[] bytIn = new byte[(int) fileIn.length()];  
            for (int i = 0; i < fileIn.length(); i++) {  
                bytIn[i] = (byte) in.read();  
            }
            
            //输出流
            out = new FileOutputStream(fileIn.getPath());
            
            //将密钥写入文件中
            byte[] keyArr=key.getBytes();
            for (int i = 0; i < keyArr.length; i++) {
            	out.write((int)keyArr[i]);
            }
            
            //加密  
            byte[] bytOut = encryptByDES(encryptByDES(encryptByDES(bytIn,key1), key2), key3);  
            for (int i = 0; i < bytOut.length; i++) {
            	out.write((int)bytOut[i]);
            }
        } catch (Exception e) {  
            throw e;
        } finally{
        	if(out!=null){
        		try {
					out.close();
				} catch (IOException e) {}
        	}
        	if(in!=null){
        		try {
					in.close();
				} catch (IOException e) {}
        	}
        }
    }  
  
    /**
     * 解密
     * @Title: decrypt 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 上午9:15:44
     * 
     * @param fileIn 要解密的文件
     * @param sKey 密钥
     * @throws Exception
     */
    public static void decrypt(File fileIn) throws Exception {
    	if(fileIn==null || fileIn.length()<=48){
    		throw new RuntimeException("输入的文件不合法!");
    	}
    	
    	FileInputStream in = null;
    	FileOutputStream out = null;
        try {  
            in = new FileInputStream(fileIn);
            
            byte[] keyArr=new byte[48];
            byte[] bodyArr=new byte[(int)fileIn.length()-48];
            
            for (int i = 0; i < fileIn.length(); i++) {
            	if(i<48){
            		keyArr[i]=(byte) in.read();
            	}else{
            		bodyArr[i-48] = (byte) in.read();
            	}
            }
            
            String key=new String(keyArr);
            if(key.length()<48){
            	throw new RuntimeException("输入的文件不合法!");
            }
            
            byte[] key1 = getKeyByStr(key.substring(0, 16));
            byte[] key2 = getKeyByStr(key.substring(16, 32));
            byte[] key3 = getKeyByStr(key.substring(32, 48));
            
            // 解密  
            byte[] bytOut = decryptByDES(decryptByDES(decryptByDES(bodyArr,key3), key2), key1);  
            out = new FileOutputStream(fileIn);  
            for (int i = 0; i < bytOut.length; i++) {  
            	out.write((int) bytOut[i]);  
            }  
        } catch (Exception e) {  
            throw e;
        } finally{
        	if(out!=null){
        		try {
					out.close();
				} catch (IOException e) {}
        	}
        	if(in!=null){
        		try {
					in.close();
				} catch (IOException e) {}
        	}
        }
    }
    
    /**
     * 解密文件
     * @Title: decrypt 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 下午12:14:00
     * 
     * @param sourceData
     * @return
     * @throws Exception
     */
    public static byte[] decrypt(byte[] sourceData) throws Exception {
    	if(sourceData==null || sourceData.length<=48){
    		throw new RuntimeException("输入的文件不合法!");
    	}
    	
    	ByteArrayOutputStream out=null;
        try {  
            byte[] keyArr=new byte[48];
            byte[] bodyArr=new byte[sourceData.length-48];
            
            for (int i = 0; i < sourceData.length; i++) {
            	if(i<48){
            		keyArr[i]=sourceData[i];
            	}else{
            		bodyArr[i-48] =sourceData[i];
            	}
            }
            
            String key=new String(keyArr);
            if(key.length()<48){
            	throw new RuntimeException("输入的文件不合法!");
            }
            
            byte[] key1 = getKeyByStr(key.substring(0, 16));
            byte[] key2 = getKeyByStr(key.substring(16, 32));
            byte[] key3 = getKeyByStr(key.substring(32, 48));
            
            // 解密  
            byte[] bytOut = decryptByDES(decryptByDES(decryptByDES(bodyArr,key3), key2), key1);
            out=new ByteArrayOutputStream();
            for (int i = 0; i < bytOut.length; i++) {  
            	out.write((int) bytOut[i]);  
            }
            
            return out.toByteArray();
        } catch (Exception e) {  
            throw e;
        } finally{
        	if(out!=null){
        		try {
					out.close();
				} catch (IOException e) {}
        	}
        }
    }
  
    /**
     * 用DES方法加密输入的字节 bytKey需为8字节长，是加密的密码 
     * @Title: encryptByDES 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 上午9:09:24
     * 
     * @param bytP
     * @param bytKey
     * @return
     * @throws Exception
     */
    private static byte[] encryptByDES(byte[] bytP, byte[] bytKey) throws Exception {  
        DESKeySpec desKS = new DESKeySpec(bytKey);  
        SecretKeyFactory skf = SecretKeyFactory.getInstance("DES");  
        SecretKey sk = skf.generateSecret(desKS);  
        Cipher cip = Cipher.getInstance("DES");  
        cip.init(Cipher.ENCRYPT_MODE, sk);  
        return cip.doFinal(bytP);  
    }  
  
    /**
     * 用DES方法解密输入的字节 bytKey需为8字节长，是解密的密码
     * @Title: decryptByDES 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 上午9:09:14
     * 
     * @param bytE
     * @param bytKey
     * @return
     * @throws Exception
     */
    private static byte[] decryptByDES(byte[] bytE, byte[] bytKey) throws Exception {  
        DESKeySpec desKS = new DESKeySpec(bytKey);  
        SecretKeyFactory skf = SecretKeyFactory.getInstance("DES");  
        SecretKey sk = skf.generateSecret(desKS);  
        Cipher cip = Cipher.getInstance("DES");  
        cip.init(Cipher.DECRYPT_MODE, sk);  
        return cip.doFinal(bytE);  
    }  
  
    /**
     * 输入密码的字符形式，返回字节数组形式。 如输入字符串：AD67EA2F3BE6E5AD 
     * 返回字节数组：{173,103,234,47,59,230,229,173}
     * @Title: getKeyByStr 
     * @author huanglinfeng@tydic.com
     * @date 2017年7月3日 上午9:08:54
     * 
     * @param str
     * @return
     */
    private static byte[] getKeyByStr(String str) {  
        byte[] bRet = new byte[str.length() / 2];  
        for (int i = 0; i < str.length() / 2; i++) {  
            Integer itg = new Integer(16 * getChrInt(str.charAt(2 * i))  
                    + getChrInt(str.charAt(2 * i + 1)));  
            bRet[i] = itg.byteValue();  
        }  
        return bRet;  
    }  
  
    /** 
     * 计算一个16进制字符的10进制值 输入：0-F 
     */  
    private static int getChrInt(char chr) {  
        int iRet = 0;  
        if (chr == "0".charAt(0))  
            iRet = 0;  
        if (chr == "1".charAt(0))  
            iRet = 1;  
        if (chr == "2".charAt(0))  
            iRet = 2;  
        if (chr == "3".charAt(0))  
            iRet = 3;  
        if (chr == "4".charAt(0))  
            iRet = 4;  
        if (chr == "5".charAt(0))  
            iRet = 5;  
        if (chr == "6".charAt(0))  
            iRet = 6;  
        if (chr == "7".charAt(0))  
            iRet = 7;  
        if (chr == "8".charAt(0))  
            iRet = 8;  
        if (chr == "9".charAt(0))  
            iRet = 9;  
        if (chr == "A".charAt(0))  
            iRet = 10;  
        if (chr == "B".charAt(0))  
            iRet = 11;  
        if (chr == "C".charAt(0))  
            iRet = 12;  
        if (chr == "D".charAt(0))  
            iRet = 13;  
        if (chr == "E".charAt(0))  
            iRet = 14;  
        if (chr == "F".charAt(0))  
            iRet = 15;  
        return iRet;  
    }  
  
    private static String md5s(String plainText) throws NoSuchAlgorithmException {  
        String str = null;  
        try {  
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.update(plainText.getBytes());  
            byte b[] = md.digest();  
  
            int i;  
            StringBuffer buf = new StringBuffer("");  
            for (int offset = 0; offset < b.length; offset++) {  
                i = b[offset];  
                if (i < 0)  
                    i += 256;  
                if (i < 16)  
                    buf.append("0");  
                buf.append(Integer.toHexString(i));  
            }  
            str = buf.toString().substring(8, 24);  
        } catch (NoSuchAlgorithmException e) {  
           throw e;
        }  
        return str;  
    }
    
    public static String createKey(String key1,String key2,String key3) throws NoSuchAlgorithmException{
    	return md5s(key1)+md5s(key2)+md5s(key3);
    }
  
}  
