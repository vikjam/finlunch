require 'rubygems'
require 'json'
require 'open-uri'
require 'pp'

url  = "https://spreadsheets.google.com/feeds/list/1XS40L3o9dFwdM9z5QEMXYW_vPgF_EoTDz2OL8U3Skmg/od6/public/values?alt=json"
buffer = open(url).read
result = JSON.parse(buffer)
entries = result["feed"]["entry"]
pp(entries)

puts '<table class="table">'
puts '<thead><tr><th>Date</th><th>Speaker</th><th>Paper</th></tr></thead>'
entries.each_with_index do | entry, index |

    paper_link  = ""
    if entry["gsx$linktopaper"]["$t"] != ''
        paper_link = %Q(<div><a href="#{entry["gsx$linktopaper"]["$t"]}"><button type="button" class="btn btn-link btn-xs"><i class="fa fa-download"></i> Full text</button></a></div>)
    end
    puts paper_link

    abstract    = ""
    toggle_plus = ""
    if entry["gsx$abstract"]["$t"] != ''
            abstract    = %Q(<b>Abstract</b>: #{entry["gsx$abstract"]["$t"]} #{paper_link})
            toggle_plus = %Q(<button data-toggle="collapse" data-target="#paper#{index} class="btn btn-link btn-xs accordion-toggle"><i class="fa fa-file-text-o"></i></button>)
    end

    date        = entry["gsx$date"]["$t"]
    speaker     = entry["gsx$speaker"]["$t"]
    paper       = entry["gsx$paper"]["$t"]
    puts "<tr>"
    puts "  <td>#{date}</td>"
    puts "  <td>#{speaker}</td>"
    puts "  <td>#{paper}</td>"
    puts "</tr>"   

    if abstract != ''
        puts %Q(<tr><td colspan="3" class="hiddenRow"><div class="accordian-body collapse" id="paper#{index}">#{abstract.strip}#{paper_link}</div></td></tr>)
    end
end
puts '</table>'

