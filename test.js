
    //trs
    translate(xtraslate[i],0)
    rotate(rotate_arr[i]);
    scale(2,1);

    //wave
    noFill();
    let trp = map(duration_now[i],0,duration[i],0,0.5)
    stroke(clr_h[i],clr_s[i],clr_b[i], trp)
    strokeWeight(2);
    beginShape();
    vertex(-10,height/2+random(-2,2)*50)
    xoff[i] = 0
    for (let x = 0; x < width; x++) {
      let y = map(noise(xoff[i],yoff[i]),0,1,height/2-wave_height[i],height/2+wave_height[i]);
      vertex(x,y);
      xoff[i]+=xoff_rate[i]
    }
    yoff[i]+=yoff_rate[i]
    vertex(width,height/2);
    endShape();

    pop();

    if (duration_now[i]!=0) {
      duration_now[i] -= 1
    }
    else ((duration_now[i]==-1))