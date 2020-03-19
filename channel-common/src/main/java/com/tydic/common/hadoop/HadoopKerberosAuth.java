package com.tydic.common.hadoop;

import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.security.UserGroupInformation;

public class HadoopKerberosAuth {

	public static void auth(Configuration conf,String principal,String keytabPath,String krb5ConfPath) throws IOException{
		System.setProperty("java.security.krb5.conf", krb5ConfPath);
		conf.set("hadoop.security.authentication", "kerberos");
		UserGroupInformation.setConfiguration(conf);
		try {
			UserGroupInformation ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI(principal,keytabPath);
            UserGroupInformation.setLoginUser(ugi);
		} catch (IOException e) {
			throw e;
		}
	}
	
}
