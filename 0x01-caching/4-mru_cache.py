#!/usr/bin/env python3
"""
a class MRUCache that inherits from
BaseCaching and is a caching system:
"""


from collections import deque
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRU class """
    def __init__(self):
        """ initilizer """
        super().__init__()
        self.queue = deque()

    def put(self, key, item):
        """ putto create """
        if key and item:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                popped = self.queue.pop()
                del self.cache_data[popped]
                print("DISCARD: " + str(popped))
            self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ geti to retrieve """
        if key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            return self.cache_data.get(key, None)
