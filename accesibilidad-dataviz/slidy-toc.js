/*

Slidy-Toc generates a table of contents for slidy show.
Usage see: http://www.w3c.de/PubPraes/slidy-toc.html

slidy-toc.js  must be placed behind  slidy.js.  Internal dependancies:

    * it overwrites document.onload with its own initialisation routine
    * it relies that the initialisation routine of slidy.js is named startup
    * it relies that the variable slides  holds an array of all slides of the presentation
    * it uses the clickedAnchor routine for anchor click events
    * variable ns_pos is used as in slidy to meet MSIE's need to see "classname" instead of "class" for ?etAttribute

Klaus Birkenbihl, 2005-09-16
Copyright � 2005 W3C (MIT, ERCIM, Keio)

*/

window.onload = SltocStartup;

// initialize 
function SltocStartup()
   {
        startup();       // init slidy
        SltocFilltoc();  // fill table of contents
   }

// fill table of contents
function SltocFilltoc()
   {
   var toc = 0;
   var name = ns_pos ? "class" : "className";  // to serve MSIE
   var page;                                   // URL of presentation
   var ip = location.href.indexOf("#");        
      if (ip > 0)
         page = location.href.substr(0, ip);
      else
         page = location.href;

   for (var i = 0; i < slides.length; ++i)     // find slide to contain the toc (class="toc")
      {
        if (hasToken(slides[i].getAttribute(name), "toc"))
        {
	   toc = slides[i];
           i = slides.length;
        }
      }
//	   toc = slides[1];
   if (toc)                                   // no toc found => we're done
     {
     for (var i = 0; i < slides.length; ++i)  // look at every slide
	
        {
  	  var h = slides[i].getElementsByTagName("h1")[0]; // is there a <h{1-3}>?
          if (h == null)
  	  h = slides[i].getElementsByTagName("h2")[0];
          if (h == null)
  	  h = slides[i].getElementsByTagName("h3")[0];
          if (h != null)                      // if not we'll generate no entry for this slide
          {
            var div1 = document.createElement("div"); // create div to contain link to slide
	    var a = document.createElement("a");
  	    div1.appendChild(a);
  	    toc.appendChild(div1);
	    a.setAttribute("href", page + "#("+(i+1)+")"); // generate link to slide
            div1.setAttribute(name, "tocref");
	    a.appendChild(document.createTextNode(i+1));
            var div = document.createElement("div"); // create div with contents of <h?>
            div.setAttribute(name, "tocentry");
	    toc.appendChild(div);
            for(var j=0; j < h.childNodes.length; ++j) // collect all childs of <h?>
	      div.appendChild(h.childNodes[j].cloneNode(true));
            a.onclick = clickedAnchor;               // make sure that anchor works
          }
        }
        toc.appendChild(document.createElement("br")); // cosmetics
     }
  }

