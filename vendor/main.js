 //查詢公用函式
    function sql_query(sheetID,gid,sql = null){
      var sheetID = sheetID; // 試算表代號
      var gid = gid; // 工作表代號
      //var sql = encodeURI(sql); // SQL 語法 做URL轉換
      var callback = "callback"; // 回呼函數名稱

      //送出查詢
      if(sql == null){
        $.getScript("https://spreadsheets.google.com/tq?tqx=responseHandler:" + callback + "&key=" + sheetID + "&gid=" + gid);
      }else{
        $.getScript("https://spreadsheets.google.com/tq?tqx=responseHandler:" + callback + "&tq=" + sql + "&key=" + sheetID + "&gid=" + gid);
      }
      return callback;
    }

    //
    function list_load_data(){
      var sheetID = "1dt6FX7yA_g95dX1-5vQg-_GVpfcM3PPNNs645W1YrE4", // 試算表代號
      gid = "735367841", // 工作表代號
      sql = "SELECT A , AN"; // SQL 語法
      
      var res = sql_query (sheetID,gid,sql);
      window[res] = function(json) {
        var $cSel = $('#query_list');
        var rowArray = json.table.rows,
        
        rowLength = rowArray.length,
        html = "",
        i, j, game_name,game_c_name;
        console.log(rowArray);
        for (i = 0; i < rowLength; i++) {
          dataGroup = rowArray[i].c;
          dataLength = dataGroup.length;
          for (j = 0; j < dataLength; j++) {
            if (!dataGroup[j]) {
              continue;
            }
          }
          game_name = dataGroup[0].v;
          game_c_name = dataGroup[1].v;
          $cSel.append($("<option></option>")
               .attr("value",game_name)
               .text(game_c_name)); 
          //html += "<br/>";
        }
      }
    }

    //讀取全部資料
    function eshop_game_query(){
      var sheetID = "1dt6FX7yA_g95dX1-5vQg-_GVpfcM3PPNNs645W1YrE4", // 試算表代號
      gid = "735367841", // 工作表代號
      sql = "SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN "; // SQL 語法
      //各地區中文 用硬幹的
      //var country = ['AT','AU', 'BE','BG','CA','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IT','JP','LT','LU' ,'LV' ,'MT','MX','NL' ,'NO','NZ', 'PL' ,'PT','RO','RU','SE','SI','SK' ,'US' ,'ZA'];
      var country = ['AUS','AUT','BEL','BGR','CAN','HRV','CYP','CZE','DNK','EST','FIN','FRA','DEU','GRC','HUN','IRL','ITA','JPN','LVA','LTU','LUX','MLT','MEX','NLD','NZL','NOR','POL','PRT','ROU','RUS','SVK','SVN','ZAF','ESP','SWE','CHE','GBR','USA'];                   
      var c_country = {
        'AUT':'奧地利',
        'AUS':'澳大利亞',
        'BEL':'比利時',
        'BGR':'保加利亞',
        'CAN':'加拿大',
        'CHE':'瑞士',
        'CYP':'賽普勒斯',
        'CZE':'捷克',
        'DEU':'德國',
        'DNK':'丹麥',
        'EST':'愛沙尼亞',
        'ESP':'西班牙',
        'FIN':'芬蘭',
        'FRA':'法國',
        'GBR':'英國',
        'GRC':'希臘',
        'HRV':'克羅埃西亞',
        'HUN':'匈牙利',
        'IRL':'愛爾蘭',
        'ITA':'義大利',
        'JPN':'日本',
        'LTU':'立陶宛',
        'LUX':'盧森堡',
        'LVA':'拉脫維亞',
        'MLT':'馬爾他',
        'MEX':'墨西哥',
        'NLD':'荷蘭',
        'NOR':'挪威',
        'NZL':'紐西蘭',
        'POL':'波蘭',
        'PRT':'葡萄牙',
        'ROU':'羅馬尼亞',
        'RUS':'俄羅斯',
        'SWE':'瑞典',
        'SVN':'斯洛維尼亞',
        'SVK':'斯洛伐克',
        'USA':'美國',
        'ZAF':'南非'
      };
      var price = {};
      var price_name = {};

      var res = sql_query (sheetID,gid,sql);
      $("#msg").show();
      //console.log(res);
      window[res] = function(json) {
        $("#msg").hide();
        var rowArray = json.table.rows,
        rowLength = rowArray.length,
        html = "",
        i, j;
        rowArray = shuffle(rowArray);
        var game_count = 0;
        
        var dataGroup = '';
        for (i = 0; i < rowLength; i++) {
          
          var idt = new Array;
          dataGroup = rowArray[i].c;
          dataLength = dataGroup.length;
          for (j = 0; j < dataLength; j++) {
            if (!dataGroup[j]) {
              continue;
            }
          }

          var game_name =  dataGroup[0].v;

          if(game_name == '--') continue;
          game_count ++;
          var game_cname = dataGroup[39].v;
          var show_price = '';
          var show_onsale_price = '';
          for(a = 0; a < country.length; a++){
            //console.log(dataGroup.length);
            if(dataGroup[a+1] === null) {
              price[country[a]] = 0;
            }else if(dataGroup[a+1].v === null){
              price[country[a]] = 0;
            }else{
              price[country[a]] = dataGroup[a+1].v;

            }
          }
          var sortedPrice=sortProperties(price);
          var best_price = 0;
          for(x = 0; x < sortedPrice.length ; x ++){
            var high_price = sortedPrice[sortedPrice.length-1][1].toFixed(0);
            if(sortedPrice[x][1].toFixed(1) > 0){
              //console.log(game_name+"//"+sortedPrice[x][1]);
            
            best_price = sortedPrice[x][1].toFixed(0); 
            var best_area =  sortedPrice[x][0].toLowerCase();
            var bad_area = sortedPrice[sortedPrice.length-1][0].toLowerCase();
            if(best_price == 0) {
              show_price = "    <div id='area_box'>---<br></div>";
            }else{        
              show_price = "<div id='box'><div id='lower_box' lower_price='"+ best_price +"'><a id='price_title'>最低價格</a><div id='box_hr' ></div><a id='lower_contry'>"+c_country[sortedPrice[x][0]]+"</a><a id='lower_price'> NT$" + best_price + "</a></div></div>";
              if(high_price > 0 && sortedPrice[x][0] != sortedPrice[sortedPrice.length-1][0]){
                show_price += "<div id='box'><div id='higher_box' higher_price='"+ high_price +"''><a id='price_title'>最高價格</a><div id='box_hr' ></div><a id='higher_contry'>"+c_country[sortedPrice[sortedPrice.length-1][0]]+"</a><a id='higher_price'> NT$" + high_price + "</a><br></div></div>";
                show_onsale_price +=  "<div id='onsale_box'>與最高價地區價差高達<a id='pricetip'>NT$" + (high_price - best_price).toFixed(0) + "</a>!<br></div>";
              }
            }
              break;
            }else{
              show_price = "    <div id='area_box'>---<br></div>";
            }
          }
          game_name = game_name.replace(/'/g,"");
          html += "<div style='position:relative;'><div class='game_box' name='"+ game_name.toUpperCase() + game_name.toLowerCase() + "_" + game_name + "_"+ game_cname + "'>" + "<div id='pricebox'><div id='showname'><a id='c_name'>" + game_cname + "</a><br><a href='https://www.google.com.tw/search?q="+ game_name +" switch' target='_blank' id='name'>" + game_name + "</a></div>" + show_onsale_price +show_price +  "</div></div></div>";
          }
        $("#game_count").html('目前遊戲數量:'+game_count); 
        $(".container").html(html); 
      }

    }

    //洗牌
    function shuffle(arr){
      for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      return arr;
    }

    //名稱篩選器
    function search_name(selector){
      $(selector).on('keyup',function(){
        //console.log($(selector).val());
        if($(selector).val()==''){ 
          $(".game_box").show();
        }else{
          $(".game_box").hide();
          $("[name*='" +  $(selector).val() + "']").show();
        }
      });
    }

    //價格篩選器
    function search_price(){
      $('.price').on('keyup',function(){
        var _obj = $(".game_box");
        $(".game_box").hide();
        _obj.each(function( index ) {
          var _price = $( this ).children("#pricebox").children("#box").children("#lower_box").attr("lower_price");
          if($('#min_price').val()=='' || $('#max_price').val()==''){ 
            $(".game_box").show();
          }else if($('#min_price').val() < parseInt(_price) && $('#max_price').val() > parseInt(_price)){
            $(this).show();
          }
        });
      });
    }

    //排序
    function sortProperties(obj)
    {
      var sortable=[];
      for(var key in obj)
        if(obj.hasOwnProperty(key))
          sortable.push([key, obj[key]]); 
          sortable.sort(function(a, b){
            return a[1]-b[1]; 
          });
        return sortable; 
    }
