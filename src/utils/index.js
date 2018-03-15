export const getDimension = (nodes) => {
  let globalDimension = null;
  Object.values(nodes)
    .forEach(function(node) {
      let rect = node.getBoundingClientRect();
      if(!globalDimension) {
        globalDimension = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
        return;
      }

      if((rect.left + rect.width) - (globalDimension.left + globalDimension.width) != 0) {
        globalDimension.width += Math.abs((rect.left + rect.width) - (globalDimension.left + globalDimension.width));
      }

      if((rect.top + rect.height - globalDimension.top + globalDimension.height) != 0) {
        globalDimension.height += Math.abs((rect.top + rect.height) - (globalDimension.top + globalDimension.height));
      }

      if(rect.left < globalDimension.left) {
        globalDimension.left = rect.left;
      }

      if(rect.top < globalDimension.top) {
        globalDimension.top = rect.top;
      }


    });

  return globalDimension;
}
