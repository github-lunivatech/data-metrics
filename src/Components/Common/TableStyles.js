export const newTableStyles = `
<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
}
table {
    width: 100%;
    max-width: 100%;
    // margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
}
thead > tr > th, tbody > tr > td {
    padding: 4px 4px;
    overflow-wrap: break-word;
    
    border-bottom: 1px solid #232325;
}
thead > tr > th {
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    font-weight: 500;
    text-align: left;
    // background: #fafafa;
    border-top: 1px solid #232325;
    border-bottom: 1px solid #232325;
    transition: background 0.3s ease;
}
tbody > tr > td {
    border-bottom: 1px solid #f0f0f1;
    transition: background 0.3s;
    font-size: 10px;
}




.gocenter {
    text-align: center;
}
.gocenter h2, .gocenter p{
    margin: 0;
}
.headingContent{
    display: flex;
    justify-content: space-between;
  }
</style>
`;