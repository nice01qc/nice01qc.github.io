import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Nice {
    public static void main(String[] args) {
        File director = new File("");
        String listFileName =director.getAbsolutePath() +"\\" + "transformlist.txt";
        List<String> list = new ArrayList<String>();
        getlist(list,listFileName);

        for (String x : list) {
            if (!x.contains(".md")){
                x = x + ".md";
            }
            x = director.getAbsolutePath() +"\\" + x;
            replace(x);
        }
    }

    static void getlist(List<String> list, String dir){
        File file = new File(dir);
        BufferedReader reader = null;
        try{
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            while ((tempString = reader.readLine()) != null){
                if (!tempString.equals(""))
                    list.add(tempString);
            }
            reader.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    static void replace(String dir){
        StringBuffer filestr = new StringBuffer("");
        File file = new File(dir);
        BufferedReader reader = null;
        try{
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            int pan = 0;    // 0:{% highlight ruby %} 1:{% endhighlight %}
            while ((tempString = reader.readLine()) != null){
                if (tempString.contains("```")){
                    if (pan == 0){
                        tempString = tempString.replace("```","{% highlight ruby %}");
                        pan = 1;
                    }else{
                        tempString = tempString.replace("```","{% endhighlight %}");
                        pan = 0;
                    }

                }
                filestr.append(tempString + "\r\n");
            }
            reader.close();
        }catch (IOException e){
            e.printStackTrace();
        }

        OutputStreamWriter bufferedWriter = null;

        try{
            bufferedWriter = new OutputStreamWriter(new FileOutputStream(file),"UTF-8");
            bufferedWriter.write(filestr.toString());
            bufferedWriter.flush();
            bufferedWriter.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }



}
