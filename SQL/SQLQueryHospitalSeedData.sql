
set identity_insert [Hospital] on
insert into [Hospital] ([Id], [Name]) 
values (1, 'Centennial'), (2, 'Centennial Peds'), (3, 'Centennial Womens'),  (4, 'Skyline'), (5, 'Southern Hills'), (6, 'St.Thomas Midtown'),
	   (7, 'St.Thomas west'), (8, 'Summit'), (9, 'Vandy'), (10, 'Vandy Peds'), (11, 'Vandy Womens')
set identity_insert [Hospital] off
