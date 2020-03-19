package com.tydic.common.rsa;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.security.PrivateKey;
import java.security.PublicKey;

public class SecurityUtils {

	/** 
     * 解密 
     * @param cipherText 密文 
     * @return 返回解密后的字符串 
     * @throws Exception  
     */  
    public static String decrypt(String cipherText) throws Exception{  
        // 从文件中得到私钥  
        PrivateKey privateKey = getPrivateKey();
        byte[] decryptByte = RSAUtils.decryptData(Base64Utils.decode(cipherText), privateKey);  
        String decryptStr = new String(decryptByte,"utf-8");  
        return decryptStr;  
    }
    
    /** 
     * 加密 
     * @param plainTest 明文 
     * @return  返回加密后的密文 
     * @throws Exception  
     */  
    public static String encrypt(String plainTest) throws Exception{  
        PublicKey publicKey = getPublicKey();  
        // 加密  
        byte[] encryptByte = RSAUtils.encryptData(plainTest.getBytes(), publicKey);  
        String afterencrypt = Base64Utils.encode(encryptByte);  
        return afterencrypt;  
    } 
    
    private static PrivateKey getPrivateKey() throws Exception{
    	ObjectInputStream in = null;
    	try {
			in=new ObjectInputStream(SecurityUtils.class.getClassLoader().getResourceAsStream("pkcs8_private_key.pem"));
			return (PrivateKey)in.readObject();
		} catch (Exception e) {
			throw e;
		} finally{
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {}
			}
		}
    }
    
    private static PublicKey getPublicKey() throws Exception{
    	ObjectInputStream in = null;
    	try {
    		in=new ObjectInputStream(SecurityUtils.class.getClassLoader().getResourceAsStream("rsa_public_key.pem"));
    		return (PublicKey)in.readObject();
    	} catch (Exception e) {
    		throw e;
    	} finally{
    		if(in!=null){
    			try {
    				in.close();
    			} catch (IOException e) {}
    		}
    	}
    }
	
}
