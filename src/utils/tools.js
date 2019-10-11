export function treeTableXcode(data,xcode){
    xcode = xcode || "";
    for(var i=0;i<data.length;i++){
        var item = data[i];
        item.xcode = xcode + i;
        if(item.children && item.children.length > 0){
            treeTableXcode(item.children,item.xcode+"-");
        }
    }
    return data
}