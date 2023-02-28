const CrystalFormat = () => {
    return (
        <>
            <div className="page-header">
                <div className="headerHTML">
                    <div className="row">
                        <div className="column logo-header"><img id="logo" style={{ maxHeight: '50px', maxWidth: '50px' }} rowSpan="3" /></div>
                        <div className="column title-header"><div className="CompanyName"></div><div className="CompanyAddress"></div></div>
                        <div className="column contact-header">
                            <div><span className="label">Phone/Email :</span><span className="CompanyEmail"></span></div>
                            <br />
                            <div><span className="CompanyWebSite"></span></div>
                        </div>
                    </div>
                </div>
                <div className="PatientInfo">
                    <div className="row">
                        <div className="column">
                            <span className="label">Patient's Name:</span><span className="PatientName"></span>
                        </div>
                        <div className="column">&nbsp;</div>
                        <div className="column">
                            <span className="label">Lab No:</span><span className="Reg_No"></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <span className="label">Age/Gender:</span><span className="Age"></span>/<span className="Gender"></span>
                        </div>
                        <div className="column">&nbsp;</div>
                        <div className="column">
                            <span className="label">Sample Received:</span><span className="SampleReceived"></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <span className="label">Contact No:</span><span className="ContactNo"></span>
                        </div>
                        <div className="column">&nbsp;</div>
                        <div className="column">&nbsp;</div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <span className="label">Referred By:</span><span className="ReferredBy"></span>
                        </div>
                        <div className="column">&nbsp;</div>
                        <div className="column">
                            <span className="label">Date of Reporting:</span><span className="ReportingDate"></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <span className="label">Requested By:</span><span className="RequestedBy"></span>
                        </div>
                        <div className="column">&nbsp;</div>
                        <div className="column">&nbsp;</div>
                    </div>
                </div>

            </div>

            <div className="page-footer">
                <div className="Checkers row">
                </div>

                <div className="footerHTML">

                </div>
            </div>

            <table className="main">
                <thead><tr><td><div className="report-header"></div></td></tr></thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="page-content">

                            </div>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td>
                            <div className="report-footer"></div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div style={{ display: 'none' }} className="panel-title">
                <div className="title-panel"></div>
            </div>

            <div style={{ display: 'none' }} className="checker-info">
                <div className="Checker column">
                    <div className="Signature"></div>
                    <div className="Name"></div>
                    <div className="Designation"></div>
                    <div className="RegNo"></div>
                </div>
            </div>
            <div style={{ display: 'none' }} className="group-title">
                <div className="title-group"></div>
            </div>

            <div style={{ display: 'none' }} className="test-table">
                <div className="table-test" style={{ textAlign: 'left' }}>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Test</th>
                                <th>Result</th>
                                <th>Flag</th>
                                <th>Unit</th>
                                <th>Reference Range</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span className="TestName"></span></td>
                                <td><span className="TestResult"></span></td>
                                <td><span className="CheckedBy"></span></td>
                                <td><span className="Unit"></span></td>
                                <td><span className="Max"></span></td>
                                <td><span className="Method"></span></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="TestNote">
                                <td colSpan="6"><span className="note-label">Note: </span><span className="Note"></span></td>
                            </tr>
                            <tr className="SubTestNote">
                                <td colSpan="6"><span className="note-label">Note: </span><span className="SubNote"></span></td>
                            </tr>
                            <tr>
                                <td colSpan="6"><span className="note-label">Note: </span></td>
                            </tr>
                            <tr>
                                <td colSpan="6"><span className="GroupNote"></span></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div style={{ display: 'none' }} className="subtest-table">
                <div className="table-subtest">
                    <table>
                        <tbody>
                            <tr>
                                <td>&nbsp;&nbsp;<span className="TestSubType"></span></td>
                                <td><span className="SubResult"></span></td>
                                <td><span className="Designation"></span></td>
                                <td><span className="SubUnit"></span></td>
                                <td><span className="Range"></span></td>
                                <td><span className="SubMethod"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
export default CrystalFormat