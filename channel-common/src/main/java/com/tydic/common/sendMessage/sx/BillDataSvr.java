/**
 * BillDataSvr.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.tydic.common.sendMessage.sx;

public interface BillDataSvr extends javax.xml.rpc.Service {
    public java.lang.String getBillDataSvrHttpPortAddress();

    public com.tydic.common.sendMessage.sx.BillDataSvrPortType getBillDataSvrHttpPort() throws javax.xml.rpc.ServiceException;

    public com.tydic.common.sendMessage.sx.BillDataSvrPortType getBillDataSvrHttpPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
