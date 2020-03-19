package com.tydic.common.http;

import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.lang.StringUtils;

import sun.misc.BASE64Decoder;

public class DecryptUtil {
	 
		private final byte[] DESIV = new byte[] { 0x12, 0x34, 0x56, 120, (byte) 0x90, (byte) 0xab, (byte) 0xcd, (byte) 0xef };// 向量
	 
		private AlgorithmParameterSpec iv = null;// 加密算法的参数接口
		private Key key = null;
		
		private String charset = "utf-8";
		
		public DecryptUtil(String deSkey, String charset) throws Exception {
			if (StringUtils.isNotBlank(charset)) {
				this.charset = charset;
			}
			DESKeySpec keySpec = new DESKeySpec(deSkey.getBytes(this.charset));// 设置密钥参数
			iv = new IvParameterSpec(DESIV);// 设置向量
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");// 获得密钥工厂
			key = keyFactory.generateSecret(keySpec);// 得到密钥对象
		}
		
		public String decode(String data) throws Exception {
			Cipher deCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
			deCipher.init(Cipher.DECRYPT_MODE, key, iv);
			BASE64Decoder base64Decoder = new BASE64Decoder();
			byte[] pasByte = deCipher.doFinal(base64Decoder.decodeBuffer(data));
			return new String(pasByte, "UTF-8");
		}
		
		public static void main(String[] args) {
			try {
				String s="m3f+lLlooyA=";
				String key = "9ba45bfd500642328ec03ad8ef1b6e75";// 自定义密钥
				
				DecryptUtil des2 = new DecryptUtil(key,"utf-8");
				
				System.out.println("解密后的字符：" + des2.decode(s));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
}