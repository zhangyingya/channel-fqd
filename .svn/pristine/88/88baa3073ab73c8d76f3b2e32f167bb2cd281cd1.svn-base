package com.tydic.common.http;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.params.HttpConnectionParams;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class HttpCli {
	private CloseableHttpClient httpClient;
	private CookieStore cookieStore = new BasicCookieStore();

	/** 连接超时时间 */
	private Long connectionTimeout;
	/** 读取超时时间 */
	private Long soTimeout;

	public void setConnectionTimeout(Long connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}

	public void setSoTimeout(Long soTimeout) {
		this.soTimeout = soTimeout;
	}

	public HttpCli() throws Exception {
		httpClient = this.getHttpClient(false);
	}

	public HttpCli(Boolean isHttps) throws Exception {
		httpClient = this.getHttpClient(isHttps);
	}

	public void downloadFile(String url, File destFile) throws RuntimeException, IOException {
		CloseableHttpResponse response = null;
		FileOutputStream fos = null;
		try {
			HttpGet httpGet = new HttpGet(url);
			response = this.httpClient.execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				byte[] remoteFile = EntityUtils.toByteArray(response.getEntity());
				fos = new FileOutputStream(destFile);
				fos.write(remoteFile);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			if (null != fos) {
				fos.close();
			}
			if (response != null) {
				response.close();
			}
		}
	}

	/**
	 * 下载文件到输出流
	 * 
	 * @Title: downloadFile
	 * @author huanglinfeng@tydic.com
	 * @date 2016年2月22日 上午11:20:13
	 * 
	 * @param url
	 * @param fos
	 * @throws RuntimeException
	 * @throws IOException
	 */
	public void downloadFile(String url, OutputStream fos) throws RuntimeException, IOException {
		CloseableHttpResponse response = null;
		try {
			HttpGet httpGet = new HttpGet(url);
			response = this.httpClient.execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				byte[] remoteFile = EntityUtils.toByteArray(response.getEntity());
				fos.write(remoteFile);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			if (response != null) {
				response.close();
			}
		}
	}

	private String execute(HttpUriRequest method, CloseableHttpClient httpClient) throws RuntimeException, IOException {
		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(method);
			HttpEntity entity = response.getEntity();
			return EntityUtils.toString(entity, method.getFirstHeader(HttpHeaders.CONTENT_ENCODING).getValue());
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			if (response != null) {
				response.close();
			}
		}
	}

	public String executePost(String url, String contentType, String param) {
		return this.executePost(url, contentType, "UTF-8", param);
	}

	public String executePost(String url, String contentType, String encoding, String param) {
		HttpPost httpPost = new HttpPost(url);
		try {
			this.initMethodParam(httpPost, contentType, encoding);
			if (param != null) {
				httpPost.setEntity(new StringEntity(param, encoding));
			}
			return this.execute(httpPost, this.getHttpClient());
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			httpPost.releaseConnection();
		}
	}

	public String executePost(String url, String param) {
		return this.executePost(url, null, "UTF-8", param);
	}

	public String executeGet(String url, String contentType) {
		return this.executeGet(url, "UTF-8", contentType);
	}

	@SuppressWarnings("deprecation")
	public String executeGet(String url, String encoding, String contentType) {
		HttpGet httpGet = new HttpGet(url);
		if (connectionTimeout != null) {
			httpGet.getParams().setParameter(HttpConnectionParams.CONNECTION_TIMEOUT, 5000);
		}
		if (soTimeout != null) {
			httpGet.getParams().setParameter(HttpConnectionParams.SO_TIMEOUT, 5000);
		}
		try {
			this.initMethodParam(httpGet, contentType, encoding);
			return this.execute(httpGet, this.getHttpClient());
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			httpGet.releaseConnection();
		}
	}

	public String executeGet(String url) {
		return this.executeGet(url, "UTF-8", null);
	}

	private void initMethodParam(HttpUriRequest method, String contentType, String encoding) {
		if (contentType != null) {
			method.setHeader(HttpHeaders.CONTENT_TYPE, contentType);
		}
		method.setHeader(HttpHeaders.CONTENT_ENCODING, encoding);
	}

	@SuppressWarnings("deprecation")
	private CloseableHttpClient getHttpClient(Boolean isHttps) throws Exception {
		CloseableHttpClient httpClient = null;
		try {
			if (isHttps) {

				TrustManager[] trustManagers = new TrustManager[1];
				trustManagers[0] = new X509TrustManager() {
					@Override
					public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
					}

					@Override
					public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
					}

					@Override
					public X509Certificate[] getAcceptedIssuers() {
						return null;
					}

				};
				SSLContext sslContext = SSLContext.getInstance("TLS");
				sslContext.init(new KeyManager[0], trustManagers, new SecureRandom());
				SSLContext.setDefault(sslContext);
				sslContext.init(null, trustManagers, null);
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext,
						SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClient = HttpClients.custom().setDefaultCookieStore(cookieStore).setSSLSocketFactory(sslsf).build();
			} else {
				httpClient = HttpClients.custom().setDefaultCookieStore(cookieStore).build();
			}
		} catch (Exception e) {
			throw e;
		}
		return httpClient;
	}

	public CloseableHttpClient getHttpClient() {
		return httpClient;
	}

	public void destroy() {
		try {
			httpClient.close();
		} catch (IOException e) {
		}
	}

	public CookieStore getCookieStore() {
		return cookieStore;
	}

	public void setCookieStore(CookieStore cookieStore) {
		this.cookieStore = cookieStore;
	}
	
}
