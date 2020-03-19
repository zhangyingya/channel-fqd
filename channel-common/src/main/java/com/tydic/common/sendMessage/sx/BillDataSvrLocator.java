/**
 * BillDataSvrLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.tydic.common.sendMessage.sx;

public class BillDataSvrLocator extends org.apache.axis.client.Service implements com.tydic.common.sendMessage.sx.BillDataSvr {

    public BillDataSvrLocator() {
    }


    public BillDataSvrLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public BillDataSvrLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for BillDataSvrHttpPort
    private java.lang.String BillDataSvrHttpPort_address = "http://192.168.128.89:19002/smp_in/servlet/BillDataServlet";

    public java.lang.String getBillDataSvrHttpPortAddress() {
        return BillDataSvrHttpPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String BillDataSvrHttpPortWSDDServiceName = "BillDataSvrHttpPort";

    public java.lang.String getBillDataSvrHttpPortWSDDServiceName() {
        return BillDataSvrHttpPortWSDDServiceName;
    }

    public void setBillDataSvrHttpPortWSDDServiceName(java.lang.String name) {
        BillDataSvrHttpPortWSDDServiceName = name;
    }

    public com.tydic.common.sendMessage.sx.BillDataSvrPortType getBillDataSvrHttpPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(BillDataSvrHttpPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getBillDataSvrHttpPort(endpoint);
    }

    public com.tydic.common.sendMessage.sx.BillDataSvrPortType getBillDataSvrHttpPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.tydic.common.sendMessage.sx.BillDataSvrHttpBindingStub _stub = new com.tydic.common.sendMessage.sx.BillDataSvrHttpBindingStub(portAddress, this);
            _stub.setPortName(getBillDataSvrHttpPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setBillDataSvrHttpPortEndpointAddress(java.lang.String address) {
        BillDataSvrHttpPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.tydic.common.sendMessage.sx.BillDataSvrPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                com.tydic.common.sendMessage.sx.BillDataSvrHttpBindingStub _stub = new com.tydic.common.sendMessage.sx.BillDataSvrHttpBindingStub(new java.net.URL(BillDataSvrHttpPort_address), this);
                _stub.setPortName(getBillDataSvrHttpPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("BillDataSvrHttpPort".equals(inputPortName)) {
            return getBillDataSvrHttpPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://intf.smpin.tydic.com", "BillDataSvr");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://intf.smpin.tydic.com", "BillDataSvrHttpPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("BillDataSvrHttpPort".equals(portName)) {
            setBillDataSvrHttpPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
