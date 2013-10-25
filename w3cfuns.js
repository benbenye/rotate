(
	function($)
	{
		$
		(
			function()
			{
				$("#prevbt,#nextbt").hover
				(
					function()
					{
						$(this).stop().animate({"opacity":.8}, 300);
					},
					function()
					{
						$(this).stop().animate({"opacity":.3}, 300);
					}
				);
				
				(
					function()
					{
						var timer = null;
						var banner = $(".banner:first");
						var prevbt = $("#prevbt");
						var nextbt = $("#nextbt");
						var ul = banner.find("ul:first");
						var li = ul.find("li");
						var lifirst = ul.find("li:first");
						var lilast = ul.find("li:last");
						lilast.clone().insertBefore(lifirst);
						lifirst.clone().insertAfter(lilast);
						var newli = ul.find("li");
						var len = newli.length;
						var index = 1;
						ul.css({"margin-left":"-900px", "width":(len * 900)});
						
						banner.hover
						(
							function()
							{
								clearTimeout(timer);
							},
							function()
							{
								autoplay();
							}
						);
						
						prevbt.click
						(
							function()
							{
								index = newli.index(newli.eq(index));
								ul.stop(true, true).animate
								(
									{"margin-left": 0 - (index - 1) * 900},
									{
										duration:800,
										easing:"easeOutCubic",
										complete:function()
										{
											--index;
											if(index <= 0)
											{
												index = len - 2;
												ul.css("margin-left", 0 - (len - 2) * 900);
											}
										}
									}
								);
							}
						);
						
						nextbt.click
						(
							function()
							{
								index = newli.index(newli.eq(index));
								ul.stop(true, true).animate
								(
									{"margin-left": 0 - (index + 1) * 900},
									{
										duration:800,
										easing:"easeOutCubic",
										complete:function()
										{
											++index;
											if(index == len - 1)
											{
												ul.css("margin-left","-900px");
												index = 1;
											}
										}
									}
								);
							}
						);
						
						var autoplay = function()
						{
							timer = setTimeout
							(
								function()
								{
									index = newli.index(newli.eq(index));
									ul.stop(true, true).animate
									(
										{"margin-left": 0 - (index + 1) * 900},
										{
											duration:800,
											easing:"easeOutCubic",
											complete:function()
											{
												++index;
												if(index == len - 1)
												{
													ul.css("margin-left","-900px");
													index = 1;
												}
												autoplay();
											}
										}
									);
								}, 4800
							);
						};
						
						autoplay();
					}
				)();
				
				(
					function()
					{
						var timer = null;
						var feedlist = $("#feedlist");
						var btup = $("#btup");
						var btdown = $("#btdown");
						var ul = feedlist.find("ul:first");
						var li = ul.find("li");
						var lifirst = ul.find("li:first");
						var lilast = ul.find("li:last");
						lilast.clone().insertBefore(lifirst);
						lifirst.clone().insertAfter(lilast);
						var newli = ul.find("li");
						var len = newli.length;
						var index = 1;
						ul.css({"margin-top":"-30px", "height":(len * 30)});
						
						feedlist.hover
						(
							function()
							{
								clearTimeout(timer);
							},
							function()
							{
								autoplay();
							}
						);
						
						btup.click
						(
							function()
							{
								index = newli.index(newli.eq(index));
								ul.stop(true, true).animate
								(
									{"margin-top": 0 - (index - 1) * 30},
									{
										duration:600,
										easing:"easeOutCubic",
										complete:function()
										{
											--index;
											if(index <= 0)
											{
												index = len - 2;
												ul.css("margin-top", 0 - (len - 2) * 30);
											}
										}
									}
								);
							}
						);
						
						btdown.click
						(
							function()
							{
								index = newli.index(newli.eq(index));
								ul.stop(true, true).animate
								(
									{"margin-top": 0 - (index + 1) * 30},
									{
										duration:600,
										easing:"easeOutCubic",
										complete:function()
										{
											++index;
											if(index == len - 1)
											{
												ul.css("margin-top","-30px");
												index = 1;
											}
										}
									}
								);
							}
						);
						
						var autoplay = function()
						{
							timer = setTimeout
							(
								function()
								{
									index = newli.index(newli.eq(index));
									ul.stop(true, true).animate
									(
										{"margin-top": 0 - (index + 1) * 30},
										{
											duration:800,
											easing:"easeOutCubic",
											complete:function()
											{
												++index;
												if(index == len - 1)
												{
													ul.css("margin-top","-30px");
													index = 1;
												}
												autoplay();
											}
										}
									);
								}, 4800
							);
						};
						
						autoplay();
					}
				)();
			}
		);
	}
)(jq);
