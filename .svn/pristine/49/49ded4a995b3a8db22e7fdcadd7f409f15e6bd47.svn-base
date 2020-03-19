package com.tydic.common.ssl;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

public class SSLContextGenerate {
	
	private String jksPath;
	private String storePass;
	private SSLContext sslContext;
	
	public SSLContextGenerate(String jksPath,String storePass) throws Exception {
		this.jksPath=jksPath;
		this.storePass=storePass;
		
		try {
			sslContext = SSLContext.getInstance("SSLv3");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		try {
			if (getKeyManagers() != null && getTrustManagers() != null) {
				sslContext.init(getKeyManagers(), getTrustManagers(), null);
			}
		} catch (Exception e) {
			throw e;
		}
		sslContext.createSSLEngine().getSupportedCipherSuites();
	}
	
	public SSLContext generate(){
		return this.sslContext;
	}

	private TrustManager[] getTrustManagers() throws Exception {
		FileInputStream is = null;
		KeyStore ks = null;
		TrustManagerFactory keyFac = null;

		TrustManager[] kms = null;
		try {
			// 获得KeyManagerFactory对象. 初始化位默认算法
			if(System.getProperties().get("java.vm.name").toString().
					toLowerCase().contains("ibm j9 vm")){
				keyFac = TrustManagerFactory.getInstance("ibmX509");
			}else{
				keyFac = TrustManagerFactory.getInstance("SunX509");
			}
			is = new FileInputStream(jksPath);
			ks = KeyStore.getInstance("JKS");
			ks.load(is, storePass.toCharArray());
			keyFac.init(ks);
			kms = keyFac.getTrustManagers();
		} catch (Exception e) {
			throw e;
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {}
			}
		}
		return kms;
	}

	private KeyManager[] getKeyManagers() throws Exception {
		FileInputStream is = null;
		KeyStore ks = null;
		KeyManagerFactory keyFac = null;

		KeyManager[] kms = null;
		try {
			// 获得KeyManagerFactory对象. 初始化位默认算法
			if(System.getProperties().get("java.vm.name").toString().
					toLowerCase().contains("ibm j9 vm")){
				keyFac = KeyManagerFactory.getInstance("ibmX509");
			}else{
				keyFac = KeyManagerFactory.getInstance("SunX509");
			}
			is = new FileInputStream(jksPath);
			ks = KeyStore.getInstance("JKS");
			ks.load(is, storePass.toCharArray());
			keyFac.init(ks, storePass.toCharArray());
			kms = keyFac.getKeyManagers();
		} catch (Exception e) {
			throw e;
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {}
			}
		}
		return kms;
	}

}
